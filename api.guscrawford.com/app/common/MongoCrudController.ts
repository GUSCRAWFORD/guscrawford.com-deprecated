import { ObjectID } from "mongodb";
import {
    ODataHttpContext,
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { DbContext } from '../db/db.guscrawford.com';
export class MongoCrudController<T extends {_id:ObjectID}> extends ODataController {
    static createMongoQuery(query:ODataQuery) {
        return createQuery(query);
    }
    static defaultName(_this: any) {
        const controllerPostifx = "Controller";
        if (_this.collectionName )
            return _this.collectionName;
        if (_this.prototype)
            return _this.prototype.constructor.name.split(controllerPostifx)[0];
        else 
            return _this.constructor.name.split(controllerPostifx)[0];
    }
    static onHook(_this: any, hookName:string, controllerContext:ControllerContext) {
        if (typeof _this['on'+hookName] === 'function')
            _this['on'+hookName](controllerContext);
    }
    @odata.GET
    async find ( @odata.query query?: ODataQuery, @odata.context requestContext?: ODataHttpContext) {
        const
            dbContext = await new DbContext().connect(),
            mongodbQuery = createQuery(query),
            controllerContext = new ControllerContext(dbContext, requestContext, null, null, query, mongodbQuery);
        MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        MongoCrudController.onHook(this, 'BeforeQuery', controllerContext);
        if (mongodbQuery && typeof mongodbQuery.query._id == "string")
            mongodbQuery.query._id = new ObjectID(mongodbQuery.query._id);
        let result = typeof mongodbQuery.limit == "number" && mongodbQuery.limit === 0 ? [] : await dbContext.db.collection(MongoCrudController.defaultName(this))
                .find(mongodbQuery.query)
                .project(mongodbQuery.projection)
                .skip(mongodbQuery.skip || 0)
                .limit(mongodbQuery.limit || 0)
                .sort(mongodbQuery.sort)
                .toArray();
        controllerContext.data = result;
        MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        MongoCrudController.onHook(this, 'AfterQuery', controllerContext);
        dbContext.client.close();
        return result;
    }
    @odata.GET
    async findOne( @odata.key key:string, @odata.query query?: ODataQuery, @odata.context requestContext?: ODataHttpContext ){
        const
            dbContext = await new DbContext().connect(),
            mongoQuery = createQuery(query),
            controllerContext = new ControllerContext(dbContext, requestContext, null, key, query, mongoQuery);
        let keyObject;
        try {keyObject = new ObjectID(key);}catch(ex){}
        MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        MongoCrudController.onHook(this, 'BeforeRead', controllerContext);
        let result = dbContext.db.collection(MongoCrudController.defaultName(this))
            .findOne({_id:keyObject || key},{
                fields: mongoQuery.projection
            }).then(result=>{
                controllerContext.data = result;
                return result;
            });
        MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        MongoCrudController.onHook(this, 'AfterRead', controllerContext);
        dbContext.client.close();
        return result;
    }
    @odata.POST
    async insert( @odata.body data:T, @odata.context requestContext: ODataHttpContext) {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, data);
        
        MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        MongoCrudController.onHook(this, 'BeforeInsert', controllerContext);
        var result = await dbContext.db
        .collection(MongoCrudController.defaultName(this))
        .insertOne(data)
        .then(result=>{
            data._id = result.insertedId;
            return data;
        });
        MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        MongoCrudController.onHook(this, 'AfterInsert', controllerContext);
        dbContext.client.close();
        return result;
    }
    @odata.PUT
    async upsert( @odata.key key: string, @odata.body data: any, @odata.context requestContext: ODataHttpContext): Promise<T> {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, data, key);
        if (data._id) delete data._id;
        let keyId, result;
        try{ keyId = new ObjectID(key); }catch(err){ keyId = key; }
        MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        MongoCrudController.onHook(this, 'BeforeUpsert', controllerContext);
        result = await dbContext.db
        .collection(MongoCrudController.defaultName(this))
        .updateOne(
            { _id: keyId },
            { $set:data }, 
            {
                upsert: true
            }
        ).then((result) => {
            data._id = result.upsertedId
            return data._id ? data : null;
        });
        MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        MongoCrudController.onHook(this, 'AfterUpsert', controllerContext);
        dbContext.client.close();
        return result;
    }
    @odata.PATCH
    async update( @odata.key key: string, @odata.body delta: any, @odata.context requestContext: ODataHttpContext): Promise<number> {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, null, key, null, null, delta);
        if (delta._id) delete delta._id;
        let keyId, result;
        try{ keyId = new ObjectID(key); }catch(err){ keyId = key; }
        MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        MongoCrudController.onHook(this, 'BeforeUpdate', controllerContext);
        result = await dbContext.db
            .collection(MongoCrudController.defaultName(this))
            .updateOne(
                { _id: keyId },
                { $set: delta }
            ).then(result => result.modifiedCount);
        MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        MongoCrudController.onHook(this, 'AfterUpdate', controllerContext);
        dbContext.client.close();
        return result;
    }

    @odata.DELETE
    async remove( @odata.key key: string, @odata.context requestContext: ODataHttpContext): Promise<number> {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, null, key);
        let keyId, result;
        try{ keyId = new ObjectID(key); }catch(err){ keyId = key; }
        MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        MongoCrudController.onHook(this, 'BeforeDelete', controllerContext);
        result = await dbContext.db
            .collection(MongoCrudController.defaultName(this))
            .deleteOne({ _id: keyId })
            .then(result => result.deletedCount);
        MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        MongoCrudController.onHook(this, 'AftereDelete', controllerContext);
        dbContext.client.close();
        return result;
    }
}
export class ControllerContext {
    constructor(
        public dbContext?:DbContext,
        public requestContext?:ODataHttpContext,
        public data?: any,
        public key?: any,
        public query?: ODataQuery,
        public mongoQuery?: any,
        public delta?:any
    ) {};
}
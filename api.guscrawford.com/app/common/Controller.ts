import { ObjectID } from "mongodb";
import {
    ODataHttpContext,
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { DbContext } from '../db/db.guscrawford.com';
export class Controller<T extends {_id:ObjectID}> extends ODataController {
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
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeQuery', controllerContext);
        if (mongodbQuery && typeof mongodbQuery.query._id == "string")
            mongodbQuery.query._id = new ObjectID(mongodbQuery.query._id);
        let result = typeof mongodbQuery.limit == "number" && mongodbQuery.limit === 0 ? [] : await dbContext.db.collection(Controller.defaultName(this))
                .find(mongodbQuery.query)
                .project(mongodbQuery.projection)
                .skip(mongodbQuery.skip || 0)
                .limit(mongodbQuery.limit || 0)
                .sort(mongodbQuery.sort)
                .toArray();
        controllerContext.data = result;
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterQuery', controllerContext);
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
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeRead', controllerContext);
        let result = dbContext.db.collection(Controller.defaultName(this))
            .findOne({_id:keyObject || key},{
                fields: mongoQuery.projection
            }).then(result=>{
                controllerContext.data = result;
                return result;
            });
        dbContext.client.close();
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterRead', controllerContext);
        return result;
    }
    @odata.POST
    async insert( @odata.body data:T, @odata.context requestContext: ODataHttpContext) {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, data);
        
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeInsert', controllerContext);
        var result = await dbContext.db
        .collection(Controller.defaultName(this))
        .insertOne(data)
        .then(result=>{
            console.log(result);
            console.log(data);
            data._id = result.insertedId;
            dbContext.client.close();
            return data;
        });
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterInsert', controllerContext);
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
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeUpsert', controllerContext);
        result = await dbContext.db
        .collection(Controller.defaultName(this))
        .updateOne(
            { _id: keyId },
            data, 
            {
                upsert: true
            }
        ).then((result) => {
            data._id = result.upsertedId
            return data._id ? data : null;
        });
        dbContext.client.close();
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterUpsert', controllerContext);
        return result;
    }
    @odata.PATCH
    async update( @odata.key key: string, @odata.body delta: any, @odata.context requestContext: ODataHttpContext): Promise<number> {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, null, key, null, null, delta);
        try{ if (delta.CategoryId) delta.CategoryId = new ObjectID(delta.CategoryId); }catch(err){}
        if (delta._id) delete delta._id;
        let keyId, result;
        try{ keyId = new ObjectID(key); }catch(err){ keyId = key; }
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeUpdate', controllerContext);
        result = await dbContext.db
            .collection(Controller.defaultName(this))
            .updateOne(
                { _id: keyId },
                { $set: delta }
            ).then(result => result.modifiedCount);
        dbContext.client.close();
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterUpdate', controllerContext);
        return result;
    }

    @odata.DELETE
    async remove( @odata.key key: string, @odata.context requestContext: ODataHttpContext): Promise<number> {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, null, key);
        let keyId, result;
        try{ keyId = new ObjectID(key); }catch(err){ keyId = key; }
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeDelete', controllerContext);
        result = await dbContext.db
            .collection(Controller.defaultName(this))
            .deleteOne({ _id: keyId })
            .then(result => result.deletedCount);
        dbContext.client.close();
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AftereDelete', controllerContext);
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
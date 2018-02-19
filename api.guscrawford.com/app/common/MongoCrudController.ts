import { ObjectID } from "mongodb";
import {
    ODataHttpContext,
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { DbContext } from './DbContext';
export class MongoCrudController<T extends {_id?:ObjectID | string}> extends ODataController {
    @odata.GET
    async find ( @odata.query query?: ODataQuery, @odata.context requestContext?: ODataHttpContext) {
        const
            dbContext = await new DbContext().connect(),
            mongodbQuery = createQuery(query),
            controllerContext = new ControllerContext(dbContext, requestContext, null, null, query, mongodbQuery);
        await MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        await MongoCrudController.onHook(this, 'BeforeQuery', controllerContext);
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
        await MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        await MongoCrudController.onHook(this, 'AfterQuery', controllerContext);
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
        await MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        await MongoCrudController.onHook(this, 'BeforeRead', controllerContext);
        let result = dbContext.db.collection(MongoCrudController.defaultName(this))
            .findOne({_id:keyObject || key},{
                fields: mongoQuery.projection
            }).then(result=>{
                controllerContext.data = result;
                return result;
            });
        await MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        await MongoCrudController.onHook(this, 'AfterRead', controllerContext);
        dbContext.client.close();
        return result;
    }
    @odata.POST
    async insert( @odata.body data:T, @odata.context requestContext: ODataHttpContext) {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, data);
        
        await MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        await MongoCrudController.onHook(this, 'BeforeInsert', controllerContext);
        var result = await dbContext.db
        .collection(MongoCrudController.defaultName(this))
        .insertOne(data)
        .then(result=>{
            data._id = result.insertedId;
            return data;
        });
        await MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        await MongoCrudController.onHook(this, 'AfterInsert', controllerContext);
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
        await MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        await MongoCrudController.onHook(this, 'BeforeUpsert', controllerContext);
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
        await MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        await MongoCrudController.onHook(this, 'AfterUpsert', controllerContext);
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
        await MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        await MongoCrudController.onHook(this, 'BeforeUpdate', controllerContext);
        result = await dbContext.db
            .collection(MongoCrudController.defaultName(this))
            .updateOne(
                { _id: keyId },
                { $set: delta }
            ).then(result => result.modifiedCount);
        await MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        await MongoCrudController.onHook(this, 'AfterUpdate', controllerContext);
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
        await MongoCrudController.onHook(this, 'BeforeAny', controllerContext);
        await MongoCrudController.onHook(this, 'BeforeDelete', controllerContext);
        result = await dbContext.db
            .collection(MongoCrudController.defaultName(this))
            .deleteOne({ _id: keyId })
            .then(result => result.deletedCount);
        await MongoCrudController.onHook(this, 'AfterAny', controllerContext);
        await MongoCrudController.onHook(this, 'AftereDelete', controllerContext);
        dbContext.client.close();
        return result;
    }    static createMongoQuery(query:ODataQuery) {
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
    static async onHook<T extends {_id?:ObjectID | string}>(_this: any, hookName:string, controllerContext:ControllerContext<T>): Promise<any> {

        if (!_this.prototype) _this = _this.constructor;
        console.log(_this);
        if (typeof _this['on'+hookName] === 'function')
            return _this['on'+hookName](controllerContext);
        else return new Promise((resolve, reject)=>resolve());
    }
}
export class ControllerContext<T extends {_id?:ObjectID | string}> {
    constructor(
        public dbContext?:DbContext,
        public requestContext?:ODataHttpContext,
        public data?: T,
        public key?: any,
        public query?: ODataQuery,
        public mongoQuery?: any,
        public delta?:any
    ) {};
}
import { ObjectID } from "mongodb";
import {
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { Model } from '../models/Model';
import { DbClient } from '../db/db.guscrawford.com';
export class MongoRepo<TCollection extends Model> {
    static createMongoQuery(query:ODataQuery) {
        return createQuery(query);
    }
    static defaultName(_this: any) {
        const controllerPostifx = "Controller";
        if (_this.collectionName )
            return _this.collectionName;
        return _this.prototype.constructor.name.split(controllerPostifx)[0];
    }
    static onHook(_this: any, hookName:string, controllerContext:ControllerContext) {
        if (typeof _this['on'+7] === 'function')
            _this['on'+hookName](controllerContext);
    }
    static onBeforeAny(controllerContext:ControllerContext) { }
    static onAfterAny(controllerContext:ControllerContext) { }
    async find ( @odata.query query: ODataQuery ) {
        const
            dbClient = await new DbClient().connect(),
            mongodbQuery = createQuery(query),
            controllerContext = new ControllerContext(dbClient, null, null, query, mongodbQuery);
        MongoRepo.onHook(this, 'BeforeAny', controllerContext);
        MongoRepo.onHook(this, 'BeforeQuery', controllerContext);
        if (typeof mongodbQuery.query._id == "string")
            mongodbQuery.query._id = new ObjectID(mongodbQuery.query._id);
        let result = typeof mongodbQuery.limit == "number" && mongodbQuery.limit === 0 ? [] : await dbClient.db.collection(Controller.defaultName(this))
                .find(mongodbQuery.query)
                .project(mongodbQuery.projection)
                .skip(mongodbQuery.skip || 0)
                .limit(mongodbQuery.limit || 0)
                .sort(mongodbQuery.sort)
                .toArray();
        controllerContext.data = result;
        MongoRepo.onHook(this, 'AfterAny', controllerContext);
        MongoRepo.onHook(this, 'AfterQuery', controllerContext);
        dbClient.client.close();
        return result;
    }
    async findOne( @odata.key key:string, @odata.query query: ODataQuery ){
        const
            dbClient = await new DbClient().connect(),
            mongoQuery = createQuery(query),
            controllerContext = new ControllerContext(dbClient, null, key, query, mongoQuery);
        let keyObject;
        try {keyObject = new ObjectID(key);}catch(ex){}
        MongoRepo.onHook(this, 'BeforeAny', controllerContext);
        MongoRepo.onHook(this, 'BeforeRead', controllerContext);
        let result = dbClient.db.collection(MongoRepo.defaultName(this))
            .findOne({_id:keyObject || key},{
                fields: mongoQuery.projection
            }).then(result=>{
                controllerContext.data = result;
                return result;
            });
        dbClient.client.close();
        MongoRepo.onHook(this, 'AfterAny', controllerContext);
        MongoRepo.onHook(this, 'AfterRead', controllerContext);
        return result;
    }
    async insert( @odata.body data:TCollection ) {
        const
            dbClient = await new DbClient().connect(),
            controllerContext = new ControllerContext(dbClient, data);
        
        MongoRepo.onHook(this, 'BeforeAny', controllerContext);
        MongoRepo.onHook(this, 'BeforeInsert', controllerContext);
        var result = await dbClient.db
        .collection(MongoRepo.defaultName(this))
        .insertOne(data)
        .then(result=>{
            console.log(result);
            console.log(data);
            data._id = result.insertedId;
            dbClient.client.close();
            return data;
        });
        MongoRepo.onHook(this, 'AfterAny', controllerContext);
        MongoRepo.onHook(this, 'AfterInsert', controllerContext);
        return result;
    }
}
export class ControllerContext {
    constructor(
        public dbClient?:DbClient,
        public data?: any,
        public key?: any,
        public query?: ODataQuery,
        public mongoQuery?: any
    ) {};
}
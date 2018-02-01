import { ObjectID } from "mongodb";
import {
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { Model } from '../models/Model';
import { DbClient } from '../db/db.guscrawford.com';
export class Controller<TCollection extends Model> extends ODataController {
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
        if (typeof _this['on'+hookName] === 'function')
            _this['on'+hookName](controllerContext);
    }
    static onBeforeAny(controllerContext:ControllerContext) { }
    static onAfterAny(controllerContext:ControllerContext) { }
    @odata.GET
    async find ( @odata.query query: ODataQuery ) {
        const
            dbClient = await new DbClient().connect(),
            mongodbQuery = createQuery(query),
            controllerContext = new ControllerContext(dbClient, null, query, mongodbQuery);
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeQuery', controllerContext);
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
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterQuery', controllerContext);
        dbClient.client.close();
        return result;
    }
    @odata.GET
    findOne( @odata.key key:number ){
        
    }
    @odata.POST
    async insert( @odata.body data:TCollection ) {
        const
            dbClient = await new DbClient().connect(),
            controllerContext = new ControllerContext(dbClient, data);
        
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeInsert', controllerContext);
        var result = await dbClient.db
        .collection(Controller.defaultName(this))
        .insertOne(data)
        .then(result=>{
            console.log(result);
            console.log(data);
            data._id = result.insertedId;
            dbClient.client.close();
            return data;
        });
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterInsert', controllerContext);
        return result;
    }
}
export class ControllerContext {
    constructor(
        public dbClient?:DbClient,
        public data?: any,
        public query?: ODataQuery,
        public mongoQuery?: any
    ) {};
}
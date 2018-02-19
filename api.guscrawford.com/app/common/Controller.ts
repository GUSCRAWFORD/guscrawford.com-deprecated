import { ObjectID } from "mongodb";
import {
    ODataHttpContext,
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { DbContext } from './DbContext';
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

        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterQuery', controllerContext);
        dbContext.client.close();
        return controllerContext.data;
    }
    @odata.GET
    async findOne( @odata.key key:string, @odata.query query?: ODataQuery, @odata.context requestContext?: ODataHttpContext ){
        const
            dbContext = await new DbContext().connect(),
            mongoQuery = createQuery(query),
            controllerContext = new ControllerContext(dbContext, requestContext, null, key, query, mongoQuery);
        let keyObject;
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeRead', controllerContext);

        dbContext.client.close();
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterRead', controllerContext);
        return controllerContext.data;
    }
    @odata.POST
    async insert( @odata.body data:T, @odata.context requestContext: ODataHttpContext) {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, data);
        
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeInsert', controllerContext);

        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterInsert', controllerContext);
        return controllerContext.data;
    }
    @odata.PUT
    async upsert( @odata.key key: string, @odata.body data: any, @odata.context requestContext: ODataHttpContext): Promise<T> {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, data, key);
        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeUpsert', controllerContext);

        dbContext.client.close();
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterUpsert', controllerContext);
        return controllerContext.data;
    }
    @odata.PATCH
    async update( @odata.key key: string, @odata.body delta: any, @odata.context requestContext: ODataHttpContext): Promise<number> {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, null, key, null, null, delta);


        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeUpdate', controllerContext);

        dbContext.client.close();
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AfterUpdate', controllerContext);
        return controllerContext.delta;
    }

    @odata.DELETE
    async remove( @odata.key key: string, @odata.context requestContext: ODataHttpContext): Promise<number> {
        const
            dbContext = await new DbContext().connect(),
            controllerContext = new ControllerContext(dbContext, requestContext, null, key);

        Controller.onHook(this, 'BeforeAny', controllerContext);
        Controller.onHook(this, 'BeforeDelete', controllerContext);

        dbContext.client.close();
        Controller.onHook(this, 'AfterAny', controllerContext);
        Controller.onHook(this, 'AftereDelete', controllerContext);
        return controllerContext.data;
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
import { ObjectID } from "mongodb";
import {
    ODataController,
    ODataQuery,
    odata,
    HttpRequestError
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import {
    User, UserRoles,
    Post,
    GUEST_USER,
 } from '../models';
import { DbContext } from '../db/db.guscrawford.com';
import { MongoCrudController, ControllerContext } from '../common/MongoCrudController';
@odata.type(Post)
export class PostsController extends MongoCrudController<any> {
    static onBeforeAny(controllerContext:ControllerContext) {
        console.log('Posts');
        console.log(controllerContext.requestContext.request.user);
    }
    static onBeforeInsert(controllerContext:ControllerContext) {
        //if (!controllerContext.requestContext.request.user.roles.find(role=>role===UserRoles.Guest))
            //throw new HttpRequestError(403, 'permission denied');
    }
    static onAfterAny(controllerContext:ControllerContext) {
        console.log(controllerContext.data)
    }


}

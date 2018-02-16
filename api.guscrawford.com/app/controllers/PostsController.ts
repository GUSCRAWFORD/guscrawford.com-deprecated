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
import { DbContext } from '../db/DbContext';
import { MongoCrudController, ControllerContext } from '../common/MongoCrudController';
@odata.type(Post)
export class PostsController extends MongoCrudController<any> {
    static onBeforeAny(controllerContext:ControllerContext) {
        //PostsController.restrictTo(controllerContext, UserRoles.Member)
    }
    static onBeforeInsert(controllerContext:ControllerContext) {
        PostsController.restrictTo(controllerContext, UserRoles.Member)
    }
    static onBeforeUpsert(controllerContext:ControllerContext) {
        PostsController.restrictTo(controllerContext, UserRoles.Member)
    }
    static onAfterAny(controllerContext:ControllerContext) {
        //console.log(controllerContext.data)
    }

    static restrictTo(controllerContext: ControllerContext, role:UserRoles) {
        if (!controllerContext.requestContext.request.user)
            throw new HttpRequestError(403, 'Forbidden');
        if (!controllerContext.requestContext.request.user.roles.find(r=>r===role))
            throw new HttpRequestError(403, 'Forbidden');
    }

}

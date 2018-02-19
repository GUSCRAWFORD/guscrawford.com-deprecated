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
import { DbContext } from '../common/DbContext';
import { AccessControl, ControllerContext } from './AccessControl';
@odata.type(Post)
export class PostsController extends AccessControl<Post> {
    static onBeforeAny(controllerContext:ControllerContext<Post>) {
        //PostsController.restrictTo(controllerContext, UserRoles.Member)
    }
    static onBeforeInsert(controllerContext:ControllerContext<Post>) {
        PostsController.restrict(controllerContext).to.atLeast(UserRoles.Member);
        controllerContext.data.modified = controllerContext.data.created = {
            on : new Date().valueOf(),
            by: PostsController.user(controllerContext).username
        };
    }
    static onBeforeUpsert(controllerContext:ControllerContext<Post>) {
        PostsController.restrict(controllerContext).to.atLeast(UserRoles.Member);
        controllerContext.data.modified = {
            on : new Date().valueOf(),
            by: PostsController.user(controllerContext).username
        };
    }
    static onBeforeUpdate(controllerContext:ControllerContext<Post>) {
        PostsController.restrict(controllerContext).to.atLeast(UserRoles.Member);
        controllerContext.data.modified = {
            on : new Date().valueOf(),
            by: PostsController.user(controllerContext).username
        };
    }
    static onAfterAny(controllerContext:ControllerContext<Post>) {
        //console.log(controllerContext.data)
    }


}

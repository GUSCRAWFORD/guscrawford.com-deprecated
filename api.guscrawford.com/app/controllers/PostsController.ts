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
    @odata.POST("previousPost").$ref
    async setPreviousPost (@odata.key key:string, @odata.link link:string):Promise<number> {
        const dbContext = await new DbContext().connect();
        let keyId;
        try{ keyId = new ObjectID(key); }catch(err){ keyId = key; }
        let linkId;
        try{ linkId = new ObjectID(link); }catch(err){ linkId = link; }
        return await dbContext.db.collection(PostsController.defaultName(this)).updateOne({
            _id: keyId
        }, {
            $set: { previousPostId: linkId }
        }).then((result) => {
            return result.modifiedCount;
        });
    }
    @odata.GET("previousPost")
    async getPreviousPost(@odata.result result: Post, @odata.query query: ODataQuery): Promise<Post> {
        const
            dbContext = await new DbContext().connect(),
            mongodbQuery = createQuery(query);
        let catId;
        try{ catId = new ObjectID(result.previousPostId); }catch(err){ catId = result.previousPostId; }
        return dbContext.db.collection(PostsController.defaultName(this)).findOne({ _id: catId }, {
            fields: mongodbQuery.projection
        });
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
}

import { MongoCrudController, MongoDbContext, MongoControllerContext } from '@guscrawford.com/jyve/mongodb';
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
import { AccessControl } from './AccessControl';
@odata.type(Post)
export class PostsController extends AccessControl<Post> {
    @odata.POST("previousPost").$ref
    async setPreviousPost (@odata.key key:string, @odata.link link:string):Promise<number> {
        const dbContext = await new MongoDbContext().connect();
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
    @odata.GET("nextPost")
    async getNextPost(@odata.result result: Post, @odata.query query: ODataQuery): Promise<Post> {
        const
            dbContext = await new MongoDbContext().connect(),
            mongodbQuery = createQuery(query);
        return dbContext.db.collection(PostsController.defaultName(this)).findOne({ previousPostId: result._id.toHexString() }, {
            fields: mongodbQuery.projection
        });
    }
    @odata.GET("previousPost")
    async getPreviousPost(@odata.result result: Post, @odata.query query: ODataQuery): Promise<Post> {
        const
            dbContext = await new MongoDbContext().connect(),
            mongodbQuery = createQuery(query);
        let prevId;
        try{ prevId = new ObjectID(result.previousPostId); }catch(err){ prevId = result.previousPostId; }
        return dbContext.db.collection(PostsController.defaultName(this)).findOne({ _id: prevId }, {
            fields: mongodbQuery.projection
        });
    }
    static onBeforeInsert(controllerContext:MongoControllerContext<Post>) {
        PostsController.restrict(controllerContext).to.atLeast(UserRoles.Member);
        controllerContext.data.modified = controllerContext.data.created = {
            on : new Date().valueOf(),
            by: PostsController.user(controllerContext).username
        };
    }
    static onBeforeUpsert(controllerContext:MongoControllerContext<Post>) {
        PostsController.restrict(controllerContext).to.atLeast(UserRoles.Member);
        controllerContext.data.modified = {
            on : new Date().valueOf(),
            by: PostsController.user(controllerContext).username
        };
    }
    static onBeforeUpdate(controllerContext:MongoControllerContext<Post>) {
        PostsController.restrict(controllerContext).to.atLeast(UserRoles.Member);
        controllerContext.data.modified = {
            on : new Date().valueOf(),
            by: PostsController.user(controllerContext).username
        };
    }
}

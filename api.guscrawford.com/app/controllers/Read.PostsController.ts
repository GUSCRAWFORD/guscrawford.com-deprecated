import { ObjectID } from "mongodb";
import {
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { User, Post } from '../models';
import { DbContext } from '../db/db.guscrawford.com';
import { Controller, ControllerContext } from '../common/Controller';
@odata.type(Post)
export class PostsController extends Controller<any> {
    static onBeforeAny(controllerContext:ControllerContext) {
        console.log('Posts');
    }

    static onAfterAny(controllerContext:ControllerContext) {
        console.log(controllerContext.data)
    }


}

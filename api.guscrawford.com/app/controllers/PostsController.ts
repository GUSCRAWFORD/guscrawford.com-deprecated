import { ObjectID } from "mongodb";
import {
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { User, Post } from '../models';
import { DbClient } from '../db/db.guscrawford.com';
import { Controller, ControllerContext } from '../common/Controller';
@odata.type(Post)
export class PostsController extends ODataController {

    static onBeforeAny(controllerContext:ControllerContext) {
        console.log(controllerContext.data)
    }

    static onAfterAny(controllerContext:ControllerContext) {
        console.log(controllerContext.data)
    }

    @odata.GET
    async find ( @odata.query query: ODataQuery ) {
        return ['c','d']
    }

}

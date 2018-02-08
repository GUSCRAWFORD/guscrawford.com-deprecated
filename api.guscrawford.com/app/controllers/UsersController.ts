import { ObjectID } from "mongodb";
import {
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { User } from '../models/User';
import { DbContext } from '../db/db.guscrawford.com';
import { Controller, ControllerContext } from '../common/Controller';
@odata.type(User)
export class UsersController extends Controller<User> {
    static onBeforeAny(controllerContext:ControllerContext) {
        console.log('Users');
    }

    static onAfterAny(controllerContext:ControllerContext) {
        console.log(controllerContext.data)
    }
}

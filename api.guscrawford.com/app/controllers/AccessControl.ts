import { ObjectID } from "mongodb";
import {
    Edm,
    ODataHttpContext,
    ODataController,
    ODataQuery,
    odata,
    HttpRequestError
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { User, UserRoles } from '../models/User';
import { DbContext } from '../common/DbContext';
import { MongoCrudController, ControllerContext } from '../common/MongoCrudController';
const FORBIDDEN_MSG = 'Forbidden';
@odata.type(User)
export class AccessControl<T extends { _id?: ObjectID | string }> extends MongoCrudController<T> {   

    static restrict<T extends {_id?:ObjectID | string}>(controllerContext: ControllerContext<T>) {
        return new Restrictor(controllerContext)
    }
    static user<T extends {_id?:ObjectID | string}>(controllerContext:ControllerContext<T>) : User {
        return getUser(controllerContext);
    }
}
export class Restrictor<T extends {_id?:ObjectID | string}> {
    constructor(controllerContext:ControllerContext<T>) {
        this.to = {
            any : (roles:UserRoles[])=>{
                if (!getRoles(controllerContext).find(ur=>!!roles.find(tr=>tr===ur)))
                    throw new HttpRequestError(403, FORBIDDEN_MSG);
            },
            all : (roles:UserRoles[])=>{
                let userHas = getRoles(controllerContext);
                roles.forEach(role=>{
                    if (!userHas.find(ur=>ur===role))
                        throw new HttpRequestError(403, FORBIDDEN_MSG);
                });
            },
            atLeast : (role:UserRoles) =>{
                if (getRoles(controllerContext).sort().reverse()[0] < role)
                    throw new HttpRequestError(403, FORBIDDEN_MSG);
            },
            atMost : (role:UserRoles) =>{
                if (getRoles(controllerContext).sort().reverse()[0] > role)
                    throw new HttpRequestError(403, FORBIDDEN_MSG);
            }
        }
    }
    to: {
        any: (roles:UserRoles[])=>void;
        all: (roles:UserRoles[])=>void;
        atLeast: (role:UserRoles)=>void;
        atMost: (role:UserRoles)=>void;
    };
}
function getUser<T extends {_id?:ObjectID | string}>(controllerContext:ControllerContext<T>) {
    if (!controllerContext || !controllerContext.requestContext || ! controllerContext.requestContext.request) return null;
    return controllerContext.requestContext.request.user;
}
function getRoles<T extends {_id?:ObjectID | string}>(controllerContext:ControllerContext<T>) :UserRoles[] {
    let user = getUser(controllerContext);
    if (!user.roles) throw new HttpRequestError(403, FORBIDDEN_MSG);
    return user.roles;
}
export {ControllerContext};
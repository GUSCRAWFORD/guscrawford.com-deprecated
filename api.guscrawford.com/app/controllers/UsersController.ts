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
import { DbContext } from '../db/db.guscrawford.com';
import { MongoCrudController, ControllerContext } from '../common/MongoCrudController';
const SALT = '?!@#@#@#';
@odata.type(User)
export class UsersController extends MongoCrudController<User> {
    static onBeforeAny(controllerContext:ControllerContext) {
        console.log('Users');
        if (controllerContext.data.password) {
            (controllerContext as any).setPassword = controllerContext.data.password;
            console.log('Storing password %s',(controllerContext as any).setPassword);
            delete controllerContext.data.password;
        }
    }

    static onBeforeUpsert(controllerContext:ControllerContext) {
        UsersController.restrictTo(controllerContext, UserRoles.Member)
    }
    static onBeforeUpdate(controllerContext:ControllerContext) {
        UsersController.restrictTo(controllerContext, UserRoles.Member)
    }
    static onBeforeInsert(controllerContext:ControllerContext) {
        UsersController.restrictTo(controllerContext, UserRoles.Member)
    }
    static onAfterUpsert(ctx:ControllerContext) {
        let user = ctx.data;
        if ((ctx as any).setPassword) {
            console.log('Updating password...');
            return PasswordHash.generate((ctx.data as any).setPassword)
                .then(hash=>{
                    return ctx.dbContext.db.collection("Hash")
                        .updateOne({item:user._id},
                        {$set:{
                            hash:hash
                        }});                    
                });

        }
    }
    static onAfterInsert(ctx:ControllerContext) {
        console.log('Adding password (%s) for %s :',(ctx as any).setPassword, ctx.data._id)
        let user = ctx.data;
        if ((ctx as any).setPassword) {
            return PasswordHash.generate((ctx as any).setPassword)
                .then(hash=>{
                    return ctx.dbContext.db.collection("Hash")
                        .insertOne({
                            item:user._id,
                            hash:hash
                        });
                },err=>console.log('failed to hash (%s)',err))
        }
    } 
    static onAfterAny(controllerContext:ControllerContext) {
        console.log(controllerContext.data)
    }
    async login( username:string, password: string){
        const
            dbContext = await new DbContext().connect();
        let result = { verified: false, user: null, hash:null};
        let compareHash = await PasswordHash.generate(password)
        await dbContext.db.collection(MongoCrudController.defaultName(this))
            .findOne({username:username})
            .then(user=>{
                result.user = user;
                return dbContext.db.collection("Hash")
                    .findOne({item:user._id}).then(hash=>{
                        result.hash = hash;
                        return PasswordHash
                            .verify(password, hash.hash)
                            .then(verified=>{
                                result.verified = verified;
                                return verified;
                            });
                    });
            });
        dbContext.client.close();
        return result.verified?result.user:null;
    }
    
    static restrictTo(controllerContext: ControllerContext, role:UserRoles) {
        if (!controllerContext.requestContext.request.user)
            throw new HttpRequestError(403, 'Forbidden');
        if (!controllerContext.requestContext.request.user.roles.find(r=>r===role))
            throw new HttpRequestError(403, 'Forbidden');
    }
}
import * as bcrypt from 'bcrypt';
export class PasswordHash {
    static verify(password:string, hash:any) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject)=>{
            bcrypt.compare(password, hash, (err, result)=>{
                if (err) reject(err);
                if (result===true) resolve(true);
                else resolve(false)
            })
        })
    }
    static async generate(password) : Promise<string> {
        return new Promise<string>((resolve, reject)=>{
            bcrypt.hash(password, 10, (err, hash)=>{
                if (err) return reject(err);
                resolve(hash);
            });
        });
    }
}
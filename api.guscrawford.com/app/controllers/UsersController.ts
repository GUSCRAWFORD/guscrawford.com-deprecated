import { MongoCrudController, MongoDbContext, MongoControllerContext } from '@guscrawford.com/jyve/mongodb';
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
import { AccessControl, } from './AccessControl';
@odata.type(User)
export class UsersController extends AccessControl<User> {
    static onBeforeAny(controllerContext:MongoControllerContext<User>) {
        console.log('Users');
        if (controllerContext.data && controllerContext.data.password) {
            (controllerContext as any).setPassword = controllerContext.data.password;
            console.log('Storing password %s',(controllerContext as any).setPassword);
            delete controllerContext.data.password;
        }
    }

    static onBeforeUpsert(controllerContext:MongoControllerContext<User>) {
        UsersController.restrict(controllerContext).to.atLeast(UserRoles.Member)
    }
    static onBeforeUpdate(controllerContext:MongoControllerContext<User>) {
        UsersController.restrict(controllerContext).to.atLeast(UserRoles.Member)
    }
    static onBeforeInsert(controllerContext:MongoControllerContext<User>) {
        UsersController.restrict(controllerContext).to.atLeast(UserRoles.Admin)
    }
    static onAfterUpsert(ctx:MongoControllerContext<User>) {
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
    static onAfterInsert(ctx:MongoControllerContext<User>) {
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
    static onAfterAny(controllerContext:MongoControllerContext<User>) {
        console.log(controllerContext.data)
    }
    async login( username:string, password: string){
        const
            dbContext = await new MongoDbContext().connect();
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
                    }).catch(err=>console.log(err));
            });
        dbContext.client.close();
        return result.verified?result.user:null;
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
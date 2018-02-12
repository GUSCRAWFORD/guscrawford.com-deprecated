import { ObjectID } from "mongodb";
import {
    Edm,
    ODataHttpContext,
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import { createQuery } from "odata-v4-mongodb";
import { User } from '../models/User';
import { DbContext } from '../db/db.guscrawford.com';
import { MongoCrudController, ControllerContext } from '../common/MongoCrudController';
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
    static onAfterUpdate(ctx:ControllerContext) {
        let user = ctx.data;
        if ((ctx as any).setPassword) {
            console.log('Updating password...');
            PasswordHash.generate((ctx.data as any).setPassword)
                .then(hash=>{
                    ctx.dbContext.db.collection("Hash")
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
            PasswordHash.generate((ctx as any).setPassword)
                .then(hash=>{    
                    console.log('hash: %s',hash);
                    ctx.dbContext.db.collection("Hash")
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
        await dbContext.db.collection(MongoCrudController.defaultName(this))
            .findOne({username:username})
            .then(user=>{
                result.user = user;
                return dbContext.db.collection("Hash")
                    .findOne({item:user._id}).then(hash=>{
                        result.hash = hash;
                        console.log('verifying '+hash.hash+' against: '+password+' ('+PasswordHash.generate(password)+')')
                        console.log(PasswordHash.verify(password, hash.hash));
                        return PasswordHash
                            .verify(password, hash.hash)
                            .then(verified=>{
                                result.verified = verified;
                                return verified;
                            });
                    });
            });
        dbContext.client.close();
        console.log(result)
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
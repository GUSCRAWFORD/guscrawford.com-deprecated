import { ObjectID } from "mongodb";
import {
    Edm,
    ODataHttpContext,
    ODataController,
    ODataQuery,
    odata
} from "odata-v4-server";
import * as PasswordHash from 'password-hash';
import { createQuery } from "odata-v4-mongodb";
import { User } from '../models/User';
import { DbContext } from '../db/db.guscrawford.com';
import { MongoCrudController, ControllerContext } from '../common/MongoCrudController';
@odata.type(User)
export class UsersController extends MongoCrudController<User> {
    static onBeforeAny(controllerContext:ControllerContext) {
        console.log('Users');
    }
    static onAfterUpdate(ctx:ControllerContext) {
        let user = ctx.data;
        if (user.password) {
            console.log('Updating password...')
            ctx.dbContext.db.collection("Hash")
            .updateOne({item:user._id},
            {$set:{
                hash:PasswordHash.generate(user.password)
            }});
        }
    }
    static onAfterInsert(ctx:ControllerContext) {
        console.log('Adding password...')
        let user = ctx.data;
        if (user.password) {
            ctx.dbContext.db.collection("Hash")
            .insertOne({
                item:user._id,
                hash:PasswordHash.generate(user.password)
            });
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
                        console.log(PasswordHash.verify(password, hash.hash))
                        result.verified = PasswordHash.verify(password, hash.hash);
                        return result.verified;
                    });
            });
        dbContext.client.close();
        console.log(result)
        return result.verified?result.user:null;
    }
}
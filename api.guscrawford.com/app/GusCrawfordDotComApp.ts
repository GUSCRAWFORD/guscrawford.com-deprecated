import {
    ODataServer,
    odata, ODataController, Edm,
    HttpRequestError,
    ODataErrorHandler
} from "odata-v4-server";
import { UsersController} from './controllers/UsersController';
import { PostsController } from './controllers/PostsController';
const 
    ENV = process.env.NODE_ENV || "local",
    APP_CONFIG = {
        "local":{
            "hostname":"localhost",
            "port":3000,
            "prefix":"v1"
        }
    };
    class Num {}
    @Edm.Annotate({
        term: "UI.DisplayName",
        string: "Strs"
    })
    class Str {}
    @odata.type(Num)
    class NumbersController extends ODataController {
        @odata.GET
        find(args) {
            return [1,2,3];
        }
    }
    @odata.type(Str)
    class StringsController extends ODataController {
        @odata.GET
        find(args) {
            return ['a','b','c'];
        }
    }
@odata.namespace("GusCrawfordDotCom")
@odata.controller(PostsController, true)
@odata.controller(UsersController, true)
export class GusCrawfordDotComApp extends ODataServer {
    
}
//GusCrawfordDotComApp.create('/'+APP_CONFIG[ENV].prefix, APP_CONFIG[ENV].port);

import * as express from 'express';
import * as passport from 'passport';

import { BasicStrategy } from 'passport-http';
import { STATUS_CODES } from 'http'
class AuthenticationError extends HttpRequestError{
    constructor(){
        super(401, STATUS_CODES[401]);
    }
}
passport.use(new BasicStrategy((userid:string, password:string, done:(error:any, user?:any) => void) => {
    if (userid == "admin" && password == "admin") return done(null, "admin");
    done(new AuthenticationError());
}));
const app = express();
app.use(
    '/v1',
    passport.authenticate("basic", { session: false, failWithError: true }),
    GusCrawfordDotComApp.create(),
    ODataErrorHandler
);
app.listen(APP_CONFIG[ENV].port)
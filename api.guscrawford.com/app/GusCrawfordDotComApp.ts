import { ObjectID } from 'mongodb';
import {
    ODataServer,
    odata, ODataController, Edm,
    HttpRequestError,
    ODataErrorHandler
} from "odata-v4-server";
import {
    UsersController,
    PostsController
} from './controllers';
import {
    UserRoles
} from './models';
const 
    ENV = process.env.NODE_ENV || "local",
    APP_CONFIG = require('../app/App.config');

@odata.namespace("GusCrawfordDotCom")
@odata.controller(PostsController, true)
@odata.controller(UsersController, true)
export class GusCrawfordDotComApp extends ODataServer {
    
}
// NOTE: previously not using App as middleware for express
//GusCrawfordDotComApp.create('/'+APP_CONFIG[ENV].prefix, APP_CONFIG[ENV].port);


// NOTE: Express app; auth middleware
import * as express from 'express';
import * as passport from 'passport';
const
    app = express(),
    prefix = APP_CONFIG[ENV].prefix?'/'+APP_CONFIG[ENV].prefix:'';

import { JWT_STRATEGY, sign } from './JwtStrategy';
passport.use(JWT_STRATEGY);
app
.post(prefix+'/login', (req, res, next)=>{
    console.log('login');
    try {
        var token = sign("guest", {guestRoles:[UserRoles.Guest]});
        res.writeHead(204, {'Set-Cookie':'x-token='+token+';path=/;httponly'});
    }
    catch (e) {
        console.log(e);
    }
    
    console.log('logged in');
    res.end();
})
.use(
    prefix,
    passport.authenticate("jwt", { session: false, failWithError: APP_CONFIG[ENV].jwt.failWithError }),
    GusCrawfordDotComApp.create(),
    ODataErrorHandler
);
app.listen(APP_CONFIG[ENV].port)
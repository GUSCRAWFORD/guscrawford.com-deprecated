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
    app = express();

import { jwtStrategy } from './JwtStrategy';
import * as Jwt from 'jsonwebtoken';
passport.use(jwtStrategy);
app
.get('/'+APP_CONFIG[ENV].prefix+'/login', (req, res, next)=>{
    console.log('login');
    var token = Jwt.sign(
        {
            "sub": "5a7ba57248036e234be128a3",
            "name": "John Doe",
            "admin": true
        },
        APP_CONFIG[ENV].jwt.secret,
        {expiresIn:"2h"});
    res.writeHead(204, {'Set-Cookie':'x-token='+token+';path=/;httponly'})
    // return the information including token as JSON
    res.end();
    // res.json({
    //     success: true,
    //     message: 'Enjoy your token!',
    //     token: token
    // });
    //throw new HttpRequestError(500,'login not implemented')
})
.use(
    '/'+APP_CONFIG[ENV].prefix,
    passport.authenticate("jwt", { session: false, failWithError: APP_CONFIG[ENV].jwt.failWithError }),
    GusCrawfordDotComApp.create(),
    ODataErrorHandler
);
app.listen(APP_CONFIG[ENV].port)
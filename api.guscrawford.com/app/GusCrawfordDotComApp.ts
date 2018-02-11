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

import { JWT_STRATEGY, sign, JWT_COOKIE } from './JwtStrategy';
passport.use(JWT_STRATEGY);
const AUTHENTICATE = passport.authenticate("jwt", { session: false, failWithError:  APP_CONFIG[ENV].jwt.failWithError});
app
.use(express.json())
.post(prefix+'/login', (req, res, next)=>{
    console.log('login');
    let defaultGuestUser = {username:"guest", roles:[UserRoles.Guest]};
    console.log(req.body)
    if (req.body.username && req.body.password)
        (new UsersController()).login(req.body.username,req.body.password)
        .then(verifiedUser=>{
            setJwt(verifiedUser || defaultGuestUser);
        })
        .catch(err=>{
            console.log(err);
            setJwt(defaultGuestUser);
        });
    else setJwt(defaultGuestUser);
    function setJwt(user) {
        try {
            console.log(user);
            var token = sign(user.username, {roles:user.roles});
            res.writeHead(204, {'Set-Cookie':JWT_COOKIE+'='+token+';path=/;httponly'});
            res.end();
            console.log('logged in');
        }
        catch (e) {
            console.log(e);
        }
    }
})
.get(prefix+'/login',
    AUTHENTICATE,
    (rq, rs, nx)=>{
        console.log(rq.user);
        rs.json(rq.user);
        rs.end();
    }
)
.get(prefix+'/logout',
    AUTHENTICATE,
    (rq, rs, nx)=>{
        console.log(rq.user.username+' logout');
        try {
            rs.writeHead(204, {'Set-Cookie':JWT_COOKIE+'=;expires='+new Date(0)+';path=/;httponly'});
        }
        catch (e) {
            console.log(e);
        }
    }
)
.use(
    prefix,
    passport.authenticate("jwt", { session: false, failWithError: APP_CONFIG[ENV].jwt.failWithError }),
    GusCrawfordDotComApp.create(),
    ODataErrorHandler
);
app.listen(APP_CONFIG[ENV].port)
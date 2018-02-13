
const
    LOCAL_ENV = "local",
    DEFAULT_ROOT_REL = "../app/",
    ENV = process.env.NODE_ENV || LOCAL_ENV,
    APP_CONFIG = require(DEFAULT_ROOT_REL+'App.config'),
    SOURCE_MAP_SUPPORT = ENV===LOCAL_ENV?require('source-map-support').install():null;
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
    console.log(new Error('yo'))
    let defaultGuestUser = {_id:"guest", roles:[UserRoles.Guest]};
    if (req.body.username && req.body.password)
        (new UsersController()).login(req.body.username,req.body.password)
        .then(verifiedUser=>{
            setJwt(verifiedUser);
        })
        .catch(err=>{
            console.log(err);
            setJwt(defaultGuestUser);
        });
    else setJwt(defaultGuestUser);
    function setJwt(user) {
        try {
            if (!user) {
                res.writeHead(401, {
                    'Set-Cookie':JWT_COOKIE+'=;expires='+new Date(0)+';path=/;httponly'
                });
                res.write('Unauthorized')
                res.end();
                return;
            }
            var token = sign(user._id, {roles:user.roles||[UserRoles.Guest]});
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
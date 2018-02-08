const 
    ENV = process.env.NODE_ENV || "local",
    APP_CONFIG = require('../app/App.config');
import {
    UsersController
} from './controllers';
// JWT Strategy
import * as PassportJwt from 'passport-jwt';
export const
    JwtStrategy = PassportJwt.Strategy,
    ExtractJwt = PassportJwt.ExtractJwt,
    jwtOptions = {
        jwtFromRequest : (req)=>{
            // console.log(ExtractJwt.fromHeader('x-token')(req))
            // return ExtractJwt.fromHeader('x-token')(req);
            
            //console.log(req.headers.cookie.split(';'))
            let cookies = req.headers.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].split('=');
                if (cookie[0].trim()==='x-token') return cookie[1];
            }
            return null;
        },
        secretOrKey: APP_CONFIG[ENV].jwt.secret,
        issuer: APP_CONFIG[ENV].host,
        audience: APP_CONFIG[ENV].host,
        algorithms:['HS256']
    },
    jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done)=>{
        console.log('Trying to sign in with decodable token, connecting to DB to find subscriber in token:');
        console.log(jwtPayload);
        return (new UsersController())
            .findOne(jwtPayload.sub)
            .then(user=>{
                if (user) console.log('Found user: %s', JSON.stringify(user));
                return done(null, user);
            },
            error=>{
                console.log('Error searching for user in Users');
                return done(error, false);
            });
    });
const 
    ENV = process.env.NODE_ENV || "local",
    APP_CONFIG = require('../app/App.config');
import {
    UsersController,
} from './controllers';
import {
    GUEST_USER,
    UserRoles
} from './models';
// JWT Strategy
import * as PassportJwt from 'passport-jwt';
abstract class ExtractJwt {
    static fromCookies (cookieName:string) {
        return (req)=>{
            if (typeof req.headers.cookie!=='string') return null;
            let cookies = req.headers.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].split('=');
                if (cookie[0].trim()===cookieName) return cookie[1];
            }
            return null;
        }
    }
}
export const
    JWT_COOKIE = 'x-token',
    JwtStrategy = PassportJwt.Strategy,
    JWT_OPTIONS = {
        jwtFromRequest : ExtractJwt.fromCookies(JWT_COOKIE),
        secretOrKey: APP_CONFIG[ENV].jwt.secret,
        issuer: APP_CONFIG[ENV].host,
        audience: APP_CONFIG[ENV].host,
        algorithms:APP_CONFIG[ENV].jwt.algorithms||['HS256']
    },
    JWT_STRATEGY = new JwtStrategy(JWT_OPTIONS, (jwtPayload, done)=>{
        console.log('Trying to sign in with decodable token, connecting to DB to find subscriber in token:');
        console.log(jwtPayload);
        if (jwtPayload.sub === GUEST_USER)
            return done(null, {
                username:GUEST_USER,
                roles:[UserRoles.Guest]
            });
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

    
import * as Jwt from 'jsonwebtoken';
export function sign(sub:string|any, payload?: object|any) {
    if (!payload) payload = {};
    payload.sub = sub.toString();
    return Jwt.sign(payload,
        APP_CONFIG[ENV].jwt.secret,
        {expiresIn:APP_CONFIG[ENV].jwt.expiresIn||'1h'});
}
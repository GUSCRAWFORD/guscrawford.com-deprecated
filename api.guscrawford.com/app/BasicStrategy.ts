import {
    HttpRequestError
} from "odata-v4-server";
// Basic strategy
import { BasicStrategy } from 'passport-http';
import { STATUS_CODES } from 'http';
export const
    basicStrategy = new BasicStrategy((userid:string, password:string, done:(error:any, user?:any) => void) => {
        if (userid == "admin" && password == "admin") return done(null, "admin");
        done(new AuthenticationError());
    });

class AuthenticationError extends HttpRequestError{
    constructor(){
        super(401, STATUS_CODES[401]);
    }
}

//passport.use(basicStrategy);
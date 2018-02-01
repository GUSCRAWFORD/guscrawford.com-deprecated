import {
    ODataServer,
    odata
} from "odata-v4-server";
import { UsersController } from './controllers/UsersController';
const 
    ENV = process.env.NODE_ENV || "local",
    APP_CONFIG = require('../app/App.config');
@odata.namespace("GusCrawfordDotCom")
@odata.controller(UsersController, true)
export class GusCrawfordDotComApp extends ODataServer {
    
}
GusCrawfordDotComApp.create('/'+APP_CONFIG[ENV].prefix, APP_CONFIG[ENV].port);
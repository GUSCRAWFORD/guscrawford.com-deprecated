import {
    ODataServer,
    odata, ODataController, Edm
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
GusCrawfordDotComApp.create('/'+APP_CONFIG[ENV].prefix, APP_CONFIG[ENV].port);
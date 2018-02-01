"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const odata_v4_server_1 = require("odata-v4-server");
const odata_v4_mongodb_1 = require("odata-v4-mongodb");
const User_1 = require("../models/User");
const db_guscrawford_com_1 = require("../db/db.guscrawford.com");
let UsersController = UsersController_1 = class UsersController extends odata_v4_server_1.ODataController {
    static onBeforeAny(controllerContext) {
        console.log(controllerContext);
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield new db_guscrawford_com_1.DbClient().connect(), mongodbQuery = odata_v4_mongodb_1.createQuery(query);
            UsersController_1.onBeforeAny(new ControllerContext(dbClient, null, query));
            if (typeof mongodbQuery.query._id == "string")
                mongodbQuery.query._id = new mongodb_1.ObjectID(mongodbQuery.query._id);
            let result = typeof mongodbQuery.limit == "number" && mongodbQuery.limit === 0 ? [] : yield dbClient.db.collection("Users")
                .find(mongodbQuery.query)
                .project(mongodbQuery.projection)
                .skip(mongodbQuery.skip || 0)
                .limit(mongodbQuery.limit || 0)
                .sort(mongodbQuery.sort)
                .toArray();
            return result;
        });
    }
    findOne(key) {
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield new db_guscrawford_com_1.DbClient().connect();
            console.log(data);
            return dbClient.db
                .collection("Users")
                .insertOne(data)
                .then(result => {
                console.log(result);
                console.log(data);
                data._id = result.insertedId;
                dbClient.client.close();
                return data;
            });
        });
    }
};
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.query)
], UsersController.prototype, "find", null);
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.key)
], UsersController.prototype, "findOne", null);
__decorate([
    odata_v4_server_1.odata.POST,
    __param(0, odata_v4_server_1.odata.body)
], UsersController.prototype, "insert", null);
UsersController = UsersController_1 = __decorate([
    odata_v4_server_1.odata.type(User_1.User)
], UsersController);
exports.UsersController = UsersController;
class ControllerContext {
    constructor(dbClient, data, query) {
        this.dbClient = dbClient;
        this.data = data;
        this.query = query;
    }
    ;
}
exports.ControllerContext = ControllerContext;
var UsersController_1;

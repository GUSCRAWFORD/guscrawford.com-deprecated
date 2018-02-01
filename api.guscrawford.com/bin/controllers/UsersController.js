"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const odata_v4_server_1 = require("odata-v4-server");
const User_1 = require("../models/User");
const Controller_1 = require("../common/Controller");
let UsersController = class UsersController extends Controller_1.Controller {
    static onBeforeAny(controllerContext) {
        throw new Error("no");
    }
    static onAfterAny(controllerContext) {
        console.log(controllerContext.data);
    }
};
UsersController = __decorate([
    odata_v4_server_1.odata.type(User_1.User)
], UsersController);
exports.UsersController = UsersController;

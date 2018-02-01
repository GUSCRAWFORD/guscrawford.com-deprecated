"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const odata_v4_server_1 = require("odata-v4-server");
const Model_1 = require("./Model");
let User = class User extends Model_1.Model {
};
__decorate([
    odata_v4_server_1.Edm.String
], User.prototype, "username", void 0);
User = __decorate([
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "User"
    })
], User);
exports.User = User;

"use strict";
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
exports.DB_ENV = {
    local: {
        schema: "GusCrawfordDotCom",
        uri: "mongodb://localhost:27017"
    }
};
exports.ENV = process.env.NODE_ENV || "local";
class DbClient {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = exports.DB_ENV[exports.ENV].schema;
            this.client = yield GusCrawfordDotComDb();
            this.db = this.client.db(schema);
            return this;
        });
    }
}
exports.DbClient = DbClient;
function GusCrawfordDotComDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = exports.DB_ENV[exports.ENV].uri + '/' + exports.DB_ENV[exports.ENV].schema;
        return yield mongodb_1.MongoClient.connect(uri);
    });
}
exports.GusCrawfordDotComDb = GusCrawfordDotComDb;
;

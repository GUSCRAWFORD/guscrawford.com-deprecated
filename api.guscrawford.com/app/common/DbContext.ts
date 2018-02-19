const
    LOCAL_ENV = "local",
    DEFAULT_ROOT_REL = "../app/",
    ENV = process.env.NODE_ENV || LOCAL_ENV,
    APP_CONFIG = require('../'+DEFAULT_ROOT_REL+'App.config'),
    SOURCE_MAP_SUPPORT = ENV===LOCAL_ENV?require('source-map-support').install():null;
import { MongoClient, Db } from "mongodb";
export class DbContext {
    client: MongoClient;
    db: Db;
    async connect() {
        const schema = APP_CONFIG[ENV].DB_ENV.schema;
        this.client = await DbClient();
        this.db = this.client.db(schema);
        return this;
    }
}
export async function DbClient():Promise<MongoClient>{
    const uri = APP_CONFIG[ENV].DB_ENV.uri+'/'+APP_CONFIG[ENV].DB_ENV.schema;
    return await MongoClient.connect(uri);
};
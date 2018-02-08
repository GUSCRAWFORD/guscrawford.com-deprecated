import { MongoClient, Db } from "mongodb";
export const DB_ENV = {
    local: {
        schema:"GusCrawfordDotCom",
        uri:"mongodb://localhost:27017"
    }
};
export const ENV = process.env.NODE_ENV || "local";
export class DbContext {
    client: MongoClient;
    db: Db;
    async connect() {
        const schema = DB_ENV[ENV].schema;
        this.client = await GusCrawfordDotComDb();
        this.db = this.client.db(schema);
        return this;
    }
}
export async function GusCrawfordDotComDb():Promise<MongoClient>{
    const uri = DB_ENV[ENV].uri+'/'+DB_ENV[ENV].schema;
    return await MongoClient.connect(uri);
};
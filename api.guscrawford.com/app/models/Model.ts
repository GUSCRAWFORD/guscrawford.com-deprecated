
import { ObjectID } from 'mongodb';
import { Edm, odata } from 'odata-v4-server';
export abstract class Model {
    @Edm.Key
    @Edm.Computed
    @Edm.String
    _id: ObjectID
}
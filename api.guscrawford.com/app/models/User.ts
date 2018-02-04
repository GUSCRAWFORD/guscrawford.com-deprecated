import { Edm } from 'odata-v4-server';
import { ObjectID } from 'mongodb';
@Edm.Annotate({
    term: "UI.DisplayName",
    string: "User"
})
export class User {
    @Edm.Key
    @Edm.Computed
    @Edm.String
    _id: ObjectID;

    @Edm.String
    username: string;
}
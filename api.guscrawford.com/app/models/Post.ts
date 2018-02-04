import { Edm } from 'odata-v4-server';
import { ObjectID } from 'mongodb';
@Edm.Annotate({
    term: "UI.DisplayName",
    string: "Post"
})
export class Post {
    @Edm.Key
    @Edm.Computed
    @Edm.String
    _id: ObjectID;

    @Edm.String
    content: string;
}
import { Edm } from 'odata-v4-server';
import { ObjectID } from 'mongodb';
export class OnAndBy {
    @Edm.Int64
    on: Date | number | string;
    @Edm.String
    by: string
}
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
    @Edm.ComplexType(OnAndBy)
    created: OnAndBy;
    
    @Edm.ComplexType(OnAndBy)
    modified: OnAndBy;
}
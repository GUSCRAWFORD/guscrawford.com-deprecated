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

    roles: UserRoles[];
    
    @Edm.Function
    @Edm.String
    echo () {
        return "yo"
    }
    
}
export const GUEST_USER = "guest";
export enum UserRoles {
    Guest,
    Member
}
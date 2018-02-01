import { Edm } from 'odata-v4-server';
import { Model } from './Model';
@Edm.Annotate({
    term: "UI.DisplayName",
    string: "User"
})
export class User extends Model {
    @Edm.String
    username: string;
}
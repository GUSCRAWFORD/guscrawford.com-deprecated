import { Edm } from 'odata-v4-server';
import { Model } from './Model';
@Edm.Annotate({
    term: "UI.DisplayName",
    string: "Post"
})
export class Post extends Model {
    @Edm.String
    content: string;
    
}
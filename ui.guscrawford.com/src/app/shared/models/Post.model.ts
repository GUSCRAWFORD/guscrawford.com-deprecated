import { Any } from './Any.model';
export interface Post extends Any {
    content: string;
    created: OnAndBy;
    modified: OnAndBy;
    title?:string;
    public:boolean;
    previousPostId:string;
}
export class OnAndBy {
    constructor (
        public on: Date | number | string,
        public by: string
    ) {}
}
export interface PostView {
    
    image?:string;
    imageAlt?:string;
    imageLoaded?:boolean;
    preview?:string;
    readMore?:boolean;
}
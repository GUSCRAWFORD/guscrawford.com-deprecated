
export interface Post {
    content: string;
    _id?: string;
    created: OnAndBy;
    modified: OnAndBy;

    public:boolean;
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
    title?:string;
    preview?:string;
    readMore?:boolean;
}
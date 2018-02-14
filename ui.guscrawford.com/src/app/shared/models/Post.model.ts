export interface Post {
    content: string;
    _id?: string;
}
export interface PostView {
    
    image?:string;
    imageAlt?:string;
    imageLoaded?:boolean;
    title?:string;
    preview?:string;
    readMore?:boolean;
}
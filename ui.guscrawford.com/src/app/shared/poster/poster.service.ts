import { Injectable } from '@angular/core';
import { ODataService, ODataResource } from '../odata';
import { Post } from '../models';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class Poster {

  constructor(
    private odata:ODataService
  ) {
  }

  private resource = this.odata.resource<Post>('Posts');

  listPosts() : Observable<Post[]> {
    return this.resource.query();
  }
  readPost(postId:string) : Observable<Post>{
    return this.resource.single(postId);
  }
  createPost(post:Post) : Observable<Post> {
    return this.resource.create(post);
  }
  deletePost(postId:string) : Observable<Post> {
    return this.resource.remove(postId);
  }
  new(): Post {
    return {
      content:null
    }
  }
}

export enum PostingActions {
  Delete = 1
}
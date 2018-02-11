import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericManager } from '../GenericManager';
import { ODataService, ODataResource } from '../odata';
import { Post } from '../models';
@Injectable()
export class PostManager extends GenericManager<Post> {

  constructor(
    OData:ODataService
  ) {
    super ('Posts', OData);
  }
  getCleanModel(): Post {
    return {
      content:null
    }
  }
  
}

export enum PostingActions {
  Delete = 1
}
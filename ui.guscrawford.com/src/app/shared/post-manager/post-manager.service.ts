import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericManager } from '../GenericManager';
import { ODataService, ODataResource } from '../odata';
import { Post, OnAndBy } from '../models';
@Injectable()
export class PostManager extends GenericManager<Post> {

  constructor(
    OData:ODataService
  ) {
    super ('Posts', OData);
    this.resource.registerItemAction('GET','nextPost');
    this.resource.registerItemAction('GET', 'previousPost');
  }

  getCleanModel(): Post {
    return {
      content:null,
      created: new OnAndBy(new Date().valueOf(), ''),
      modified: new OnAndBy(new Date().valueOf(), ''),
      public:false,
      previousPostId:'',
      $:this.resource.model$odata
    }
  }
}

export enum PostingActions {
  Delete = 1
}
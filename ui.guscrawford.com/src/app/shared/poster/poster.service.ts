import { Injectable } from '@angular/core';
import { ODataService, ODataResource } from '../odata';
import { Post } from '../models';
@Injectable()
export class Poster {

  constructor(
    private odata:ODataService
  ) {
  }

  private resource = this.odata.resource<Post>('Posts');

  listPosts() {
    return this.resource.query();
  }
}

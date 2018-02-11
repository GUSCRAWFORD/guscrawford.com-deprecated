import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { GenericManager } from '../GenericManager';
import {
  API,
  ODataService
} from '../odata';

import {
  User
} from '../models';
@Injectable()
export class UserManager extends GenericManager<User> { 
  constructor(
    private http:Http,
    OData: ODataService
  ) {
    super('Users', OData);
  }
  me(): Observable<User> {
    let url = "@api/@resource"
                .replace(/@api/g,API)
                .replace(/@resource/g, 'login');
    return this.http
      .get(url, {
        withCredentials:true
      })
      .map(rs=>rs.json()).take(1);
  }
  login(username?:string, password?:string) {
    let url = "@api/@resource"
    .replace(/@api/g,API)
    .replace(/@resource/g, 'login');
    return this.http
      .post(url, username && password?{
        username: username,
        password: password
      }:{},{
        withCredentials:true
      })
      .map(rs=>rs.json()).take(1);
  }
  getCleanModel() {
    return {
      username:"",
      roles:[]
    }
  }
}
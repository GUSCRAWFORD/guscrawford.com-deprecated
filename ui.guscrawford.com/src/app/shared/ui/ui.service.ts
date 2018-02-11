import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  UserManager
} from '../user-manager';

import {
  User,
  UserRoles
} from '../models';
@Injectable()
export class UiService {

  constructor(
    private userManager:UserManager
  ) {  }
  private _user = {
    loggingIn:null,
    loggedIn:null
  }
  get user() {
    if (this._user.loggedIn) return Observable.of(this._user.loggedIn);
    if (this._user.loggingIn) return this._user.loggingIn;
    return this._user.loggingIn = new Observable(observer=>{
      this.userManager.me().subscribe(
        user=>{
          this._user.loggedIn = user;
          observer.next(user);
          observer.complete();
        },
        error=>{
          this.userManager.login().subscribe(
            user=>{
              this._user.loggedIn = user;
              observer.next(user);
              observer.complete();
            },
            err=>{
              observer.error(err);
              observer.complete;
            }
          )
        }
      )
    })
    /*return this._user.loggingIn = this.userManager.me()
      .flatMap(user=>{
        this._user.loggedIn = user;
        return Observable.of(user);
      }).catch(err=>{
        return this.userManager.login()
      }).flatMap(user=>{
        this._user.loggedIn = user;
        return Observable.of(user);
      });*/
  }
}

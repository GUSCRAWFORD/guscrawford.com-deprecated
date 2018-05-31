import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnimationBoxStates } from './AnimationBox';
import {
  UserManager
} from '../user-manager';

import {
  User,
  UserRoles
} from '../models';
import { EventListener } from '@angular/core/src/debug/debug_node';
@Injectable()
export class UiService {

  constructor(
    private userManager:UserManager
  ) {  }
  has = {
    atLeast:(role:UserRoles)=>{
      return this.user.flatMap(user=>{
        console.info('Checking '+ user.username + ' for roles: (' + UserRoles[role] + ')')
        if (user && user.roles && user.roles.length && user.roles.sort().reverse()[0] < role)
          return Observable.of(false);
        return Observable.of(true);
      })
    }
  }
  private _user = {
    loggingIn:null,
    loggedIn:null
  };

  private _state = {
    drawerMenu:AnimationBoxStates.Hidden as any,
    toolbarStyle:null
  };
  redirectAfterLogin: string;
  get drawerMenu () {
    return this._state.drawerMenu;
  }
  set drawerMenu(val) {
    this.onDrawerMenuStateChange.emit(val);
    this._state.drawerMenu = val?AnimationBoxStates.Showing:AnimationBoxStates.Hidden;
  }
  set toolbarStyle(styleObj) { this._state.toolbarStyle = styleObj; this.onToolbarStyleStateChange.emit(styleObj)};
  onToolbarStyleStateChange = new EventEmitter<any>();
  toolbarTitle: string;
  onDrawerMenuStateChange = new EventEmitter<boolean>();
  get user() : Observable<User> {
    if (this._user.loggedIn) return Observable.of(this._user.loggedIn);
    if (this._user.loggingIn) return this._user.loggingIn;
    return this.getToken().flatMap(u=>{console.log(u);return Observable.of(u)});
  }
  getToken(refresh?:boolean, username?:string, password?:string) : Observable<User> {
    return this._user.loggingIn = new Observable<User>(observer=>{
      this.userManager.me().subscribe(
        user=>{
            this._user.loggedIn = user;
            observer.next(user);
            observer.complete();
        },
        error=>{
          this.doLogin(observer, username, password)
            .flatMap(user=>{
              return this.userManager.me()
            }).subscribe(done=>{
              this._user.loggedIn = done;
            })
        }
      )
    });
  }
  doLogin(observer:Observer<User>, username?:string, password?:string) {
    return this.userManager.login(
        username&&password&&username,
        username&&password&&password
      ).flatMap(
        user=>{
          this._user.loggedIn = user;
          observer.next(user);
          observer.complete();
          return Observable.of(user);
        },
        err=>{
          observer.error(err);
          observer.complete;
        }
      );
  }
}

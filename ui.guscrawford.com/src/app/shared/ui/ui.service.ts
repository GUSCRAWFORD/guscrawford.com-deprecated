import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnimationBoxStates } from './AnimationBox';
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
  ) {
    this._observers = {
      onDrawerMenuStateChange: null
    };
    this._observables = {
      onDrawerMenuStateChange: null
    };
    this._observables.onDrawerMenuStateChange = new Observable((observer)=>{
      this._observers.onDrawerMenuStateChange = observer;
    });
  }
  private _user = {
    loggingIn:null,
    loggedIn:null
  };
  private _observers : {
    onDrawerMenuStateChange: Observer<AnimationBoxStates>
  };
  private _observables : {
    onDrawerMenuStateChange: Observable<AnimationBoxStates>
  };
  private _state = {
    drawerMenu:AnimationBoxStates.Hidden
  };
  get drawerMenuState () {
    return this._state.drawerMenu;
  }
  set drawerMenuState(val) {
    this._observers.onDrawerMenuStateChange.next(val?AnimationBoxStates.Showing:AnimationBoxStates.Hidden);
    this._state.drawerMenu = val?AnimationBoxStates.Showing:AnimationBoxStates.Hidden;
  }
  get onDrawerMenuStateChange () {
    return this._observables.onDrawerMenuStateChange;
  }
  get user() : Observable<User> {
    if (this._user.loggedIn) return Observable.of(this._user.loggedIn);
    if (this._user.loggingIn) return this._user.loggingIn;
    return this.getToken().flatMap(u=>{console.log(u);return Observable.of(u)});
  }
  getToken(refresh?:boolean, username?:string, password?:string) : Observable<User> {
    return this._user.loggingIn = new Observable<User>(observer=>{
      this._user.loggedIn = true;
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

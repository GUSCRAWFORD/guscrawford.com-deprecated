import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserRoles } from '../models';
import { UiService } from '../ui/ui.service'
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private ui: UiService) {}
  redirectAfterLogin:string;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ui.has.atLeast(UserRoles.Admin)
        .flatMap(privs=>{
            if (!privs) {
                this.ui.redirectAfterLogin = state.url;
                this.router.navigate(['/login']);
            }
            return Observable.of(privs);
        });
  }
}
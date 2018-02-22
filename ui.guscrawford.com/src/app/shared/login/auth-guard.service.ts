import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserRoles } from '../models';
import { UiService } from '../ui/ui.service'
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private ui: UiService) {}
  canActivate() {
    return this.ui.has.atLeast(UserRoles.Admin)
        .flatMap(privs=>{
            if (!privs)
                this.router.navigateByUrl('/login');
            return Observable.of(privs);
        });
  }
}
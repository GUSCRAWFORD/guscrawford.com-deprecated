import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatListItem } from '@angular/material/list';

import { UserManager } from '../../user-manager';
import { UserRoles } from '../../models';
import { UiService } from '../ui.service';

class MenuItem {
  label: string;
  'material-icon': string
  routerLink: string[];
  closeDrawer?: boolean;
  roles?: any;
  hidden?: boolean;
}
@Component({
  selector: 'app-ui-drawer-menu',
  templateUrl: './ui-drawer-menu.component.html',
  styleUrls: ['./ui-drawer-menu.component.css']
})
export class UiDrawerMenuComponent implements OnInit {

  constructor(private userManager: UserManager, public ui: UiService, private router: Router) { }

  ngOnInit() {
  }
  
  @ViewChildren(MatListItem)
  listItemComponents;

  logout() {
    this.userManager.login('','').subscribe();
    this.ui.drawerMenu = false;
  }

  itemIsActive(index:number) {
    let isActive = this.view.menu[index].routerLink.join('/') === this.router.url;
    if (!isActive && this.listItemComponents && this.listItemComponents._results.length)
      this.listItemComponents._results[index]._element.nativeElement.classList.remove('mat-list-item-focus');
    return isActive;
  }
  itemIsVisible(index:number) {
    if (typeof this.view.menu[index].hidden !== 'undefined')
      return this.view.menu[index].hidden;

    if (this.view.menu[index].roles) {
      var roleCheck = false, conditions = Object.keys(this.view.menu[index].roles);
      conditions.forEach((cond, i)=>{
        this.ui.has[cond](this.view.menu[index][cond]).subscribe(pass=>{
          roleCheck = roleCheck || pass;
          if (conditions.length === (i+1)){
            this.view.menu[index].hidden = roleCheck;
            if (!roleCheck) console.info('Showing '+this.view.menu[index].label)
          }
        });
      });
      return this.view.menu[index].hidden = true;
    }

    console.info('Showing (by default) '+this.view.menu[index].label)
    return this.view.menu[index].hidden = false;
  }
  view : { menu: MenuItem[] } = {
    menu: [
      {
        label:'Home',
        'material-icon':'home',
        routerLink:['/'],
        closeDrawer:true
      },
      {
        label:'New Post',
        'material-icon':'create',
        routerLink:['/new'],
        roles:{
          atLeast:UserRoles.Member
        },
        closeDrawer:true
      }
    ]
  }
}
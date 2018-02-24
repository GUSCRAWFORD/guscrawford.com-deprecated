import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatListItem } from '@angular/material/list';

import { UserManager } from '../../user-manager';
import { UiService } from '../ui.service';

class MenuItem {
  label: string;
  'material-icon': string
  routerLink: string[];
  closeDrawer?: boolean;
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
    this.ui.drawerMenuState = false;
  }

  itemIsActive(index:number) {
    let isActive = this.view.menu[index].routerLink.join('/') === this.router.url;
    if (!isActive && this.listItemComponents && this.listItemComponents._results.length)
      this.listItemComponents._results[index]._element.nativeElement.classList.remove('mat-list-item-focus');
    return isActive;
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
        routerLink:['/post','new'],
        closeDrawer:true
      }
    ]
  }
}
import { Component, OnInit } from '@angular/core';
import { UserManager } from '../../user-manager';
import { UiService } from '../ui.service';
@Component({
  selector: 'app-ui-drawer-menu',
  templateUrl: './ui-drawer-menu.component.html',
  styleUrls: ['./ui-drawer-menu.component.css']
})
export class UiDrawerMenuComponent implements OnInit {

  constructor(private userManager: UserManager, public ui: UiService) { }

  ngOnInit() {
  }
  activeLink: string = "/post/feed";
  logout() {
    this.userManager.login('','').subscribe();
    this.ui.drawerMenuState = false;
  }
}

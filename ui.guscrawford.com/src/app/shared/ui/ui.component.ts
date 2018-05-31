import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { UiService } from './ui.service';
@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {

  constructor(
    private ui: UiService,
    private cd: ChangeDetectorRef
  ) { }
  @ViewChild('drawer')
  drawer: any;
  @ViewChild('scrollContainer')
  scrollContainer: any;
  toolbarStyle:any;
  ngOnInit() {
    this.ui.onDrawerMenuStateChange.subscribe(
      change=>{
        this.drawer.toggle()
      }
    );
    this.ui.onToolbarStyleStateChange.subscribe(
      newStyle=>{
        this.toolbarStyle = newStyle;
        this.cd.detectChanges();
      }
    )
  }

}

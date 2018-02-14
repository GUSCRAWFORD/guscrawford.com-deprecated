import { Component, OnInit, ViewChild } from '@angular/core';

import { UiService } from './ui.service';
@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {

  constructor(
    private ui: UiService
  ) { }
  @ViewChild('drawer')
  drawer: any;

  ngOnInit() {
    this.ui.onDrawerMenuStateChange.subscribe(
      change=>{
        this.drawer.toggle()
      }
    )
  }

}

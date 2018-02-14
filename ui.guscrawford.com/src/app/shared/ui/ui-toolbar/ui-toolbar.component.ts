import { Component, OnInit } from '@angular/core';

import {
  UiService
} from '../ui.service';
@Component({
  selector: 'app-ui-toolbar',
  templateUrl: './ui-toolbar.component.html',
  styleUrls: ['./ui-toolbar.component.css']
})
export class UiToolbarComponent implements OnInit {

  constructor(
    public ui:UiService
  ) { }

  ngOnInit() {
  }

}

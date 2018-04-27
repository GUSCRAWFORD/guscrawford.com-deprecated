import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material'
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

  @ViewChild(MatButton)
  hamburger: MatButton;

  ngOnInit() {
    this.ui.onDrawerMenuStateChange.subscribe(change=>{
      this.hamburger._elementRef.nativeElement.classList.remove('cdk-focused', 'cdk-mouse-focused', 'cdk-program-focused');
    });
  }

}

import { Component, Input, ViewChild,
  OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion'
import {
  /*FormController,
  FormBuilder,
  Validators,
  PageController,
  AnimationBox,*/

  Post, PostView/*,PostingActions, UserManager,
  PostManager, UiService*/
} from '../../../shared';
@Component({
  selector: 'app-view-posting',
  templateUrl: './view-posting.component.html',
  styleUrls: ['./view-posting.component.css']
})
export class ViewPostingComponent implements OnInit, AfterViewChecked {

  constructor(
    private cd: ChangeDetectorRef
  ) { }
  @ViewChild(MatExpansionPanel)
  expPanel: MatExpansionPanel;
  @Input()
  post: Post&PostView;
  @Input()
  collapsible: boolean = true;
  ngOnInit() {
    this.post.$.nextPost(this.post._id).subscribe();
  }
  ngAfterViewChecked() {
    this.cd.detectChanges();
  }
}

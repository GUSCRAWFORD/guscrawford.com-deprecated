import { Component, Input, ViewChild,
  OnInit, AfterViewChecked, ChangeDetectorRef, } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
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
    private cd: ChangeDetectorRef,
    private activatedRoute:ActivatedRoute
  ) { }
  @ViewChild(MatExpansionPanel)
  expPanel: MatExpansionPanel;
  @Input()
  post: Post&PostView;
  nextPost: Post;
  @Input()
  collapsible: boolean = true;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
        this.post.$.nextPost(params.id?params.id:this.post._id, {$select:"_id,title"})
          .subscribe(nextPost=>{
            this.nextPost=nextPost;
            console.log(nextPost)
          },
          err=>{
            this.nextPost = null;
          });
    })

  }
  ngAfterViewChecked() {
    this.cd.detectChanges();
  }
}

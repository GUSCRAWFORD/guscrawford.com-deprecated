import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  FormController,
  FormBuilder,
  Validators,
  PageController,
  AnimationBox,

  Post,PostingActions, UserManager,
  PostManager, UiService
} from '../../../shared';
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
  animations: AnimationBox.fadeInOut
})
export class ViewPostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userManager: UserManager,
    private postManager: PostManager,
    private ui: UiService
  ) { }
  States = AnimationBox.States;
  ngOnInit() {
    this.action();
  }
  id: string;
  post: Post;
  pageControl = new PageController(this, null);
  load() : Observable<Post> {
    return this.route.params
      .flatMap(params=>{
        this.id = params.id;
        return this.ui.user
      })
      .flatMap(user=>{
        return this.postManager.one(this.id);
      })
      .flatMap(post=>{
        return Observable.of(this.post=post)
      });
  }
  action(postingAction?:PostingActions) {
    switch(postingAction) {
      case PostingActions.Delete:

    }
    this.load()
      .subscribe(next=>next, error=>error, ()=>{})
  }

}

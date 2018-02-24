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
  selector: 'app-view-read',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css'],
  animations: AnimationBox.fadeInOut
})
export class ViewFeedComponent implements OnInit {

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
  pageControl = new PageController<Post>(this, this.load);
  view = {
    hot:null,
    state:{},
    showContent:{},
    interest:(post:Post)=>{
      if (post && this.view.hot !== post) {
        this.view.state[post._id] = AnimationBox.States.Showing;
        this.view.hot = post;
      }
      else if (!post && this.view.hot) {
        this.view.state[this.view.hot._id] = AnimationBox.States.Hidden;
        this.view.hot = null;
      }
    },
    query: {
      $top:2,
      $filter:"public eq true"
    }
  }
  id: string;
  posts: Post[];
  load() : Observable<Post[]> {
    return this.route.params
      .flatMap(params=>{
        this.id = params.id;
        this.view.query.$filter = params.topic || this.view.query.$filter;
        return this.ui.user
      })
      .flatMap(user=>{
        return this.postManager.list(this.view.query);
      })
      .flatMap(posts=>{
        return Observable.of(this.posts=posts)
      });
  }
  action(postingAction?:PostingActions) {
    switch(postingAction) {
      case PostingActions.Delete:

    }
    this.pageControl.refreshPage()
      .subscribe(next=>next, error=>error, ()=>{})
  }

}

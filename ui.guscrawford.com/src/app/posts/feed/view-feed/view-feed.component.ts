import { Component, OnInit, OnDestroy } from '@angular/core';
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
enum Scrolled {
  Past = -1,
  OnScreen = 1,
  NotLoaded = 2
}
@Component({
  selector: 'app-view-read',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css'],
  animations: AnimationBox.fadeInOut
})
export class ViewFeedComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private userManager: UserManager,
    private postManager: PostManager,
    private ui: UiService
  ) { }

  States = AnimationBox.States;
  id: string;
  posts: Post[];
  get scrollContainer() {
    return document.getElementsByClassName("mat-drawer-content ng-star-inserted")[0];
  }
  action(postingAction?:PostingActions) {
    switch(postingAction) {
      case PostingActions.Delete:

    }
    this.pageControl.refreshPage()
      .subscribe(next=>next, error=>error, ()=>{})
  }
  ngOnInit() {
    this.action();
    this.scrollContainer.addEventListener('scroll', this.view.render.onScroll);
    window.onscroll = this.view.render.onScroll;
  }
  ngOnDestroy() {
    this.scrollContainer.removeEventListener('scroll', this.view.render.onScroll)
  }
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
    render:{
      $top:2,
      $skip:0,
      $postMetadata:{},
      onScroll:($event)=>{
        Object.keys(this.view.render.$postMetadata).forEach(key=>{
          console.log(this.view.render.$postMetadata[key].scrolled)
        })
      }
    },
    query: {
      $top:2,
      $filter:"public eq true and (previousPostId eq null or previousPostId eq '')",
      $orderby:"modified/on desc",
      $skip:0
    },
    load:()=> {
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
          if (!this.posts) this.posts = [];
          posts.forEach(post=>{
            this.view.render.$postMetadata[post._id] = {
              get y() {
                return (document.getElementById('post-'+post._id).offsetParent as any).offsetTop;
              },
              get scrolled() {
                return (document.getElementById('post-'+post._id).offsetParent as any).offsetTop - document.getElementsByClassName("mat-drawer-content ng-star-inserted")[0].scrollTop;
              }
            };
          })
          Array.prototype.push.apply(this.posts, posts);
          return Observable.of(posts)
        });
    },
    count:()=>{
      return this.postManager.count({$filter:this.view.query.$filter});
    }
  }
  pageControl = new PageController<Post>(this, this.view);

}

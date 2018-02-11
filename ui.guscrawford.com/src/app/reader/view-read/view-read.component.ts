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
} from '../../shared';
@Component({
  selector: 'app-view-read',
  templateUrl: './view-read.component.html',
  styleUrls: ['./view-read.component.css'],
  animations: AnimationBox.fadeInOut
})
export class ViewReadComponent implements OnInit {

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
    interest:(post:Post)=>{
      if (post && this.view.hot !== post) {
        this.view.state[post._id] = AnimationBox.States.Showing;
        this.view.hot = post;
      }
      else if (!post && this.view.hot) {
        this.view.state[this.view.hot._id] = AnimationBox.States.Hidden;
        this.view.hot = null;
      }

    }
  }
  id: string;
  posts: Post[];
  load() : Observable<Post[]> {
    return this.route.params.map(p=>p.id)
      .flatMap(id=>{
        this.id=id;
        return this.ui.user
      })
      .flatMap(user=>{
        return this.postManager.list()
      })
      .flatMap(posts=>{
        return Observable.of(this.posts=posts)
      });
  }
  action(postingAction?:PostingActions) {
    this.pageControl.refreshPage()
    .subscribe(next=>next, error=>error, ()=>{})
  }

}

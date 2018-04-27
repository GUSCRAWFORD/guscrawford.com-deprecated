import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { PostManager, Post, UiService } from '../../../shared';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private postManager: PostManager,
    private ui: UiService
  ) { }
  view = {
    loading:true
  };
  ngOnInit() {
    this.load()
      .subscribe(next=>next, error=>error, ()=>{
        this.view.loading = false;
      });
  }
  id: string;
  post: Post;
  load() {
    return this.route.params.map(p=>p.id)
      .flatMap(id=>{
        this.id = id;
        return this.ui.user
      })
      .flatMap(user=>{
        if (this.id)
          return this.postManager.one(this.id);
        let emptyModel = this.postManager.getCleanModel();
        emptyModel.modified.by = user.username;
        return Observable.of(emptyModel)
      })
      .flatMap(post=>
        Observable.of(this.post=post));
  }

}

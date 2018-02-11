import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PostManager, Post } from '../../shared';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private postManager: PostManager
  ) { }
  ngOnInit() {
    this.load()
      .subscribe(next=>next, error=>error, ()=>{});
  }
  id: string;
  post: Post;
  load() {
    return this.route.params.map(p=>p.id)
      .flatMap(id=>{
        if (id) {
          this.id=id;
          return this.postManager.one(id);
        }
        return Observable.of(this.postManager.getCleanModel());
      })
      .flatMap(post=>
        Observable.of(this.post=post));
  }

}

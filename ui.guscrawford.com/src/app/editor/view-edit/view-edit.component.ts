import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Poster, Post } from '../../shared';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private poster: Poster
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
          return this.poster.readPost(id);
        }
        return Observable.of(this.poster.new());
      })
      .flatMap(post=>
        Observable.of(this.post=post));
  }

}

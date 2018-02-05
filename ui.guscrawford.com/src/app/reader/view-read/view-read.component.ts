import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { Poster, Post } from '../../shared';
@Component({
  selector: 'app-view-read',
  templateUrl: './view-read.component.html',
  styleUrls: ['./view-read.component.css']
})
export class ViewReadComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private poster: Poster
  ) { }

  ngOnInit() {
    this.load()
    .flatMap(this.done)
    .subscribe(next=>next, error=>error, ()=>{})
  }
  loading = false;
  id: string;
  posts: Post[];
  load() {
    this.loading = true;
    return this.route.params.map(p=>p.id)
      .flatMap(id=>{
        this.id=id;
        return this.poster.listPosts()
      })
      .flatMap(posts=>this.posts=posts);
  }
  done(data) {
    this.loading = false;
    return Observable.of(data);
  }

}

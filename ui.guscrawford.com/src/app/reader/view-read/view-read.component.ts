import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Poster, Post, PageController, PostingActions } from '../../shared';
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
    this.action();
  }
  pageControl = new PageController<Post>(this, this.load)
  id: string;
  posts: Post[];
  load() : Observable<Post[]> {
    return this.route.params.map(p=>p.id)
      .flatMap(id=>{
        this.id=id;
        return this.poster.listPosts()
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

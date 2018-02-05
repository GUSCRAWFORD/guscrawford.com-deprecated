import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Poster, Post, PageController } from '../../shared';
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
    this.pageControl.refreshPage()
    .subscribe(next=>next, error=>error, ()=>{})
  }
  pageControl = new PageController<Post>(this, this.load)
  id: string;
  posts: Post[];
  load() {
    return this.route.params.map(p=>p.id)
      .flatMap(id=>{
        this.id=id;
        return this.poster.listPosts()
      })
      .flatMap(posts=>{
        return Observable.of(this.posts=posts)
      });
  }

}

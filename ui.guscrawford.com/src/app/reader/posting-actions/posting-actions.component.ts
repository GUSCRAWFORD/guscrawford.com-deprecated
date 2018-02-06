import {
  Component,
  OnInit,
  Input, Output,
  EventEmitter
} from '@angular/core';

import { Poster, Post, PageController, PostingActions } from '../../shared';

@Component({
  selector: 'app-posting-actions',
  templateUrl: './posting-actions.component.html',
  styleUrls: ['./posting-actions.component.css']
})
export class PostingActionsComponent implements OnInit {

  constructor(
    private poster:Poster
  ) { }
  @Input()
  post: Post;
  @Output()
  action = new EventEmitter<PostingActions>();
  ngOnInit() {
  }

  nuke() {
    this.poster.deletePost(this.post._id)
      .subscribe(
        deleted=>{
          this.action.emit(PostingActions.Delete)
        },
        err=>console.log(err)
      );

  }
}

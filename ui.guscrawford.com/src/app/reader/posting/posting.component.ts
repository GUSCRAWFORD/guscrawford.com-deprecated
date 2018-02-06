import { Component, OnInit, Input } from '@angular/core';
import {

  Post
} from '../../shared';
@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {

  constructor() { }
  @Input()
  post: Post;
  ngOnInit() {
  }

}

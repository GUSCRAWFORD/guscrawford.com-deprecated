import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../shared';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.css']
})
export class PostingsComponent implements OnInit {

  constructor() { }

  @Input()
  posts: Post[];
  
  ngOnInit() {
  }

}

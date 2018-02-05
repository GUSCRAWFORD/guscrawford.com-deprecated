import { Component, OnInit, Input } from '@angular/core';

import {
  FormController,
  FormBuilder,
  Validators,
  PageController,

  Post,
  Poster
} from '../../shared';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private poster: Poster
  ) { }
  @Input()
  post: Post;

  formControl = new FormController(this.builder, 'postForm');
  ngOnInit() {
    this.formControl
      .control('content','', Validators.required);
  }

  save() {
    return this.poster
      .createPost(this.post)
      .subscribe(next=>next, err=>err, ()=>{})
  }
}

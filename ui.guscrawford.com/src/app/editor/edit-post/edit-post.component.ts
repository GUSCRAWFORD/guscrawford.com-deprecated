import {
  Component,
  OnInit,
  Input
 } from '@angular/core';

import {
  FormController,
  FormBuilder,
  Validators,
  PageController,
  AnimationBox,

  Post,
  Poster
} from '../../shared';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  animations: AnimationBox.fadeInOut
})
export class EditPostComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private poster: Poster
  ) { }
  @Input()
  post: Post;
  States = AnimationBox.States;
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
  togglePreview() {
    let other = this.states.preview;
    this.states.preview = this.states.edit;
    this.states.edit = other;
  }
  states = {
    preview:AnimationBox.States.Hidden,
    edit:AnimationBox.States.Showing
  }
}

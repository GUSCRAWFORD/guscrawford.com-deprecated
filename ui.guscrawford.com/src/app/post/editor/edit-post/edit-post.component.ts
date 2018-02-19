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

  Post, PostView,
  PostManager
} from '../../../shared';
import '../../reader/view-posting/view-posting.component';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  animations: AnimationBox.fadeInOut
})
export class EditPostComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private postManager: PostManager
  ) { }
  view = {
    loading: true
  };
  @Input()
  post: Post & PostView;
  States = AnimationBox.States;
  formControl = new FormController(this.builder, 'postForm');
  ngOnInit() {
    this.formControl
      .control('content','', Validators.required);
    this.view.loading = false;
  }

  save() {
    this.view.loading = true;
    return this.postManager
      [this.post._id?'update':'create'](this.post)
      .subscribe(post=>{
        if (!this.post._id) this.post._id = post._id;
        this.togglePreview();
        this.view.loading = false;
      }, err=>err, ()=>{})
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

import {
  Component, ViewChild,
  OnInit,
  Input
 } from '@angular/core';
import {Observable} from 'rxjs';
import {
  FormController,
  FormBuilder,
  Validators,
  PageController,
  AnimationBox,

  Post, PostView,
  PostManager,
  AnimationBoxStates
} from '../../../shared';
import '../../feed/view-posting/view-posting.component';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  animations: AnimationBox.fadeInOut
})
export class EditPostComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private postManager: PostManager
  ) { }
  view = {
    loading: true,
    moreOptions: false,
    loadingPossiblePosts: false
  };
  @ViewChild('moreOptions')
  moreOptions;
  @Input()
  post: Post & PostView;
  States = AnimationBox.States;
  formControl = new FormController(this.builder, 'postForm');
  possiblePreviousPosts: Post[];

  ngOnInit() {
    this.formControl
      .control('content','', Validators.required);
    this.view.loading = false;
  }
  toggleOptions() {
    this.view.moreOptions = !this.view.moreOptions;
    if (!this.view.moreOptions)
      this.moreOptions.close();
    else this.moreOptions.open();
    if (this.view.moreOptions && !this.possiblePreviousPosts)
      this.loadPossiblePreviousPosts().subscribe()
  }
  save() {
    this.view.loading = true;
    return this.postManager
      [this.post._id?'update':'create'](this.post)
      .subscribe(post=>{
        if (!this.post._id) this.post._id = post._id;
        if (this.states.preview === AnimationBoxStates.Hidden)
          this.togglePreview();
        this.view.loading = false;
      }, err=>err, ()=>{})
  }
  loadPossiblePreviousPosts() {
    this.view.loadingPossiblePosts = true;
    return this.postManager.list({
      $select:'_id,title',
      $filter:'previousPostId eq null or previousPostId eq undefined'
    }).flatMap(possiblePreviousPosts=>{
      this.possiblePreviousPosts = possiblePreviousPosts;
      this.view.loadingPossiblePosts = false;
      return Observable.of(this.possiblePreviousPosts)
    });
  }
  togglePreview() {
    let other = this.states.preview;
    this.states.preview = this.states.edit;
    this.states.edit = other;
  }
  states = {
    preview:AnimationBox.States.Hidden,
    edit:AnimationBox.States.Showing,
  }
}

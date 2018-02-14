import {
  Component,
  OnInit,
  Input, Output,
  EventEmitter
} from '@angular/core';

import { PostManager, Post, PageController, PostingActions, User, UserRoles, UiService } from '../../shared';

@Component({
  selector: 'app-posting-actions',
  templateUrl: './posting-actions.component.html',
  styleUrls: ['./posting-actions.component.css']
})
export class PostingActionsComponent implements OnInit {

  constructor(
    private PostManager:PostManager,
    private ui: UiService
  ) { }

  UserRoles = UserRoles;

  @Input()
  post: Post;

  user: User;

  @Output()
  action = new EventEmitter<PostingActions>();

  ngOnInit() {
    this.ui.user.subscribe(user=>this.user=user);
  }
  userHasRole(role:UserRoles) {
    return true;
    // if (!this.user) return false;
    // if (this.user && this.user.roles.find(r=>r===role)) return true;
    // return false;
  }
  nuke() {
    this.PostManager.delete(this.post._id)
      .subscribe(
        deleted=>{
          this.action.emit(PostingActions.Delete)
        },
        err=>console.log(err)
      );

  }
}

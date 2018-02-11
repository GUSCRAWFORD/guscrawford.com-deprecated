import { Component, OnInit } from '@angular/core';
import {
  FormController,
  FormBuilder,
  Validators,
  PageController,
  AnimationBox
} from '../ui'
import {
  PostManager
} from '../post-manager';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: AnimationBox.fadeInOut
})
export class LoginComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private PostManager: PostManager
  ) { }
  States = AnimationBox.States;
  formControl = new FormController(this.builder, 'postForm');
  ngOnInit() {
    this.formControl
      .control('username','', Validators.required)
      .control('password','', Validators.required);
  }

}

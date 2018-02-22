import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormController,
  FormBuilder,
  Validators,
  PageController,
  AnimationBox,
  UiService
} from '../ui';
import {
  UserManager
} from '../user-manager';
import {
  User
} from '../models';
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
    private PostManager: PostManager,
    private ui: UiService,
    private userManager: UserManager,
    private router: Router
  ) { }
  States = AnimationBox.States;
  formControl = new FormController(this.builder, 'postForm');
  user: User = {
    username:'',
    password:''
  };
  ngOnInit() {
    this.formControl
      .control('username','', Validators.required)
      .control('password','', Validators.required);
  }
  login() {
    this.userManager
      .login(this.user.username, this.user.password)
      .flatMap(done=>{
        return this.ui.getToken()
      })
      .subscribe(user=>{
        console.log(user);
        this.router.navigateByUrl(this.ui.redirectAfterLogin||'/');
        this.ui.redirectAfterLogin = '';
      })
  }
}

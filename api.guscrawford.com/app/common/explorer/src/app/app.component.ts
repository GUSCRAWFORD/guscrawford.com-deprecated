import { Component } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(http:Http) {
    http.get("api").subscribe(info=>
      this.info = info.json())
  }
  title = 'app';
  info;
}

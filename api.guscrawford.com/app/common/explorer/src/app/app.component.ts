import { Component } from '@angular/core';
import { OdataService } from './shared/services/odata.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(odata:OdataService) {
    odata.api().subscribe(info=>
      this.info = info)
  }
  title = 'explorer';
  info;
}

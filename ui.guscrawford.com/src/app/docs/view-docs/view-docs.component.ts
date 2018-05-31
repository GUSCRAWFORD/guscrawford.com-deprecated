import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UiService } from '../../shared/ui'
@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.css']
})
export class ViewDocsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ui: UiService
  ) { }
  package:string;
  version:string;
  sample = [{state:'AL', region:{NCAA:'SEC'}},{state:'GA',region:{NCAA:'SEC'}},{state:'NY',region:{NCAA:'Big12'}}];
  ngOnInit() {
    this.route.params.flatMap(params=>{
      this.package = params.package;
      this.version = params.version;
      this.ui.toolbarTitle = this.package;
      this.ui.toolbarStyle={
        'background-color':'rgba(0,160,60,0.6)',
        'color':'white',
        'background-image':'url(\'https://image.flaticon.com/icons/svg/346/346195.svg\')',
        'background-size':'80px',
        'background-repeat':'no-repeat',
        'background-position':'right center'
    };
      return Observable.of(params);
    }).subscribe();
  }

}

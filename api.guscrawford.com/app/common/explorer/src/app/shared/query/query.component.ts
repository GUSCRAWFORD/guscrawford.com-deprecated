import { Component, OnInit } from '@angular/core';
import { OdataService } from '../services/odata.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  constructor(
    private odata: OdataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  query$ = this.query();
  state = {
    busy:false
  }
  query() {
    return this.route.params.map(p=>p.collectionName)
    .flatMap(collectionName=>{
      if(!collectionName) return Observable.of([])
      this.state.busy = true;
      return this.odata.resource(collectionName).query({})
    }).flatMap(done=>{
      this.state.busy=false;
      return Observable.of(done);
    });
  }
}

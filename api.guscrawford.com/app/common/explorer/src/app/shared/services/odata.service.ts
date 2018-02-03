import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
export const API = 'api'
@Injectable()
export class OdataService {

  constructor(private http:Http) { }
  resource<TModel>(name:string) :OdataResource<TModel> {
    if (this.resourceCache[name] instanceof OdataResource) return this.resourceCache[name];
    return new OdataResource<TModel>(name, this.http);
  }
  private resourceCache = {};

  api() {
    return this.http.get(API)
      .map(i=>{
        return i.json().value
      });
  }
}
export class OdataApiMetadata {
    "name": string;
    "kind": string;
    "url":  string;
}
export class OdataResource<TModel> {
  constructor(public name:string, private http: Http) {
  }
  query(query:any) {
    let url = API+'/'+this.name;
    if (query) url += serialize(query);
    return this.http
      .get(url)
      .map(rs=>rs.json().value).take(1);
  }
}
//https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
function serialize (obj, prefix?) {
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
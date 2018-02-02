import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objects'
})
export class ObjectsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
@Pipe({
  name: 'keyValuePairs'
})
export class KeyValuePairsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Object.keys(value).map(k=>{
      return {key:k, value:value[k]}
    });
  }

}

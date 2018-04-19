import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    pure:true,
    name:'kvp'
})
export class KvpPipe implements PipeTransform {
    transform(obj) {
        return Object.keys(obj).map(k=>{return {key:k,value:obj[k]}});
    }
}

@Pipe({
    pure:true,
    name:'stringify'
})
export class StringifyPipe implements PipeTransform {
    transform(obj, customSpacer?:string) {
        return JSON.stringify(obj, null, customSpacer) ;
    }
}
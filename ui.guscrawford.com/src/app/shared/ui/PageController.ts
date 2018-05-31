import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ODataQuery } from '../odata/odata.service';
export class PageController<T> {
    constructor(
        private component:any,
        private pageView?:PageView<T>
    ) { }
    refreshPage() {
        this.loading = true;
        if (this.pageView.load)
            return this.pageView.load
                .apply(this.component)
                .flatMap(data=>{
                    this.loading = false;
                    return Observable.of(data);
                });
        else {
            this.loading = false;
        }
        return true;
    }
    loading: boolean = false;
    pages: number = 0;
    page: number = 0;
    query: any = null;

}
export class PageView<T> {
    hot?;
    state?;
    showContent?;
    interest?:(t:T)=>void;
    load:()=>Observable<T[]>;
    count:()=>Observable<number>;
    query:ODataQuery;
}
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
export class PageController<T> {
    constructor(
        private component:any,
        private observable:()=>Observable<T[]>
    ) { }
    refreshPage() {
        this.loading = true;
        return this.observable
            .apply(this.component)
            .flatMap(data=>{
                this.loading = false;
                return Observable.of(data);
            });
    }
    loading: boolean = false;
    pages: number = 0;
    page: number = 0;
    query: any = null;

}
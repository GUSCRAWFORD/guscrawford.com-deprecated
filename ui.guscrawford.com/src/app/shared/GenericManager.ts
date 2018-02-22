
import { Observable } from 'rxjs/Observable';
import { ODataService } from "./odata";

export abstract class GenericManager<TModel> {
    constructor(
        protected resourceName: string,
        protected OData: ODataService
    ) { }
    protected resource = this.OData.resource<TModel>(this.resourceName);

    list(query?) : Observable<TModel[]> {
      return this.resource.query(query);
    }
    one(itemId:string) : Observable<TModel>{
      return this.resource.single(itemId);
    }
    create(item:TModel) : Observable<TModel> {
      return this.resource.create(item);
    }
    update(item:TModel) : Observable<TModel> {
        return this.resource.update(item);
    }
    delete(itemId:string) : Observable<TModel> {
      return this.resource.remove(itemId);
    }
    abstract getCleanModel();
}
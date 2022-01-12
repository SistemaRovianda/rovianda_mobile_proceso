import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { ProcessSubProductItem } from "../models/sub.product.interface";
import { ProductQualityCatalog } from "../models/product-catalog.interface";


@Injectable({ providedIn: "root" })
export class ProcessSubProductService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint,
    @Inject(API_ENDPOINT_PROVIDER_MOCKUP) private endpointMockup
  ) {
    this.url = `${endpoint}`;
  }

  getAllSubProductsOfProcess(processId): Observable<ProcessSubProductItem[]> {
    return this.http.get<ProcessSubProductItem[]>(`${this.url}/process-subproducts/${processId}`);
  }

  deleteSubProductOfprocess(subProductId) {
    return this.http.delete(`${this.url}/process-subproducts/${subProductId}`);
  }


  getAllProductsCatalog(){
    return this.http.get<ProductQualityCatalog[]>(`${this.url}/quality/products-catalog`);
  }

  registerNewSubProduct(processId:number,productRoviandaId:number,quantity:number,observations:string,userId:string){
    return this.http.post(`${this.url}/process-subproducts`,{processId,productRoviandaId,quantity,observations,userId});
  }

}

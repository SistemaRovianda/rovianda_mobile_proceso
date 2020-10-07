import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { ProductsRovianda } from "../models/produts-rovianda.interface";



@Injectable({ providedIn: "root" })
export class RawMaterialService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = endpoint;
  }

  getProductsRovianda(): Observable<ProductsRovianda[]> {
    return this.http.get<ProductsRovianda[]>(`${this.url}/products-rovianda`);
  }
}

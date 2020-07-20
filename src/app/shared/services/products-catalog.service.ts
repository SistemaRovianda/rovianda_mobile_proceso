import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER_MOCKUP,
  API_ENDPOINT_PROVIDER,
} from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { ProductCatalog } from "../models/product-catalog.interface";

@Injectable({ providedIn: "root" })
export class ProductsCatalogService {
  url: string;
  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/products/PACKING`;
  }

  getAllProducts(): Observable<ProductCatalog[]> {
    return this.http.get<ProductCatalog[]>(`${this.url}`);
  }
}

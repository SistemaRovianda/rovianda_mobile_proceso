import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { LotMeatOutput } from "../models/Lot-meat-output.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class MeatService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  getLotsMeat(
    status: string,
    rawMaterialId: number
  ): Observable<LotMeatOutput[]> {
    return this.http.get<LotMeatOutput[]>(
      `${this.url}/lote/meat/process?status=${status}&rawMaterialId=${rawMaterialId}`
    );
  }
}

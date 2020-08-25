import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { ProcessLotMeat } from "../models/procces-lot-meat.interface";

@Injectable({ providedIn: "root" })
export class LotMeatService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/process/lote/meat`;
  }

  getLotsMeatProcess(): Observable<ProcessLotMeat[]> {
    return this.http.get<ProcessLotMeat[]>(`${this.url}`);
  }
}

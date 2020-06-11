import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { LotMeatOutput } from "../models/Lot-meat-output.interface";

@Injectable({ providedIn: "root" })
export class MeatService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/meat`;
  }

  getLotsMeat(status) {
    return this.http.get<LotMeatOutput[]>(
      `${this.url}/lots/output?status=${status}`
    );
  }
}

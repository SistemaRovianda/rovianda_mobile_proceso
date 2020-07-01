import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Observable, observable } from "rxjs";
import { Conditioning } from "../models/conditioning.interface";

@Injectable({
  providedIn: "root",
})
export class ConditioningService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint,
    @Inject(API_ENDPOINT_PROVIDER_MOCKUP) private endpointMockup
  ) {
    this.url = `${endpoint}/process`;
  }

  getDataConditioning(processId): Observable<any> {
    return this.http.get<any>(`${this.url}/conditioning/${processId}`);
  }

  registerConditioning(
    conditioning: Conditioning,
    processId: number
  ): Observable<any> {
    console.log(conditioning);
    return this.http.post<any>(`${this.url}/conditioning/${processId}`, {
      ...conditioning,
    });
  }
}

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Tenderized } from "../models/tenderized.interface";
import { TenderizedItemToList } from '../models/tenderized-page.interface';

@Injectable({ providedIn: "root" })
export class TenderizedService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint,
    @Inject(API_ENDPOINT_PROVIDER_MOCKUP) private endpointMockup
  ) {
    this.url = `${endpoint}/process`;
  }

  getDataTenderized(processId): Observable<any> {
    return this.http.get<any>(`${this.url}/injection-tenderized/${processId}`);
  }

  registerTenderized(
    tenderized: TenderizedItemToList[],
    formulationId: number
  ): Observable<any> {
    console.log(tenderized);
    return this.http.post<any>(
      `${this.url}/injection-tenderized/${formulationId}`,
      {
        tenderized
      }
    );
  }

}

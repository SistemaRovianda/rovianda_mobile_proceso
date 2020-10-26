import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Grinding, GrindingItemToList, GrindingOfProcess } from "../models/grinding.interface";

@Injectable({ providedIn: "root" })
export class GrindingService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint,
    @Inject(API_ENDPOINT_PROVIDER_MOCKUP) private endpointMockup
  ) {
    this.url = `${endpoint}/process`;
  }

  getDataGrinding(processId): Observable<any> {
    return this.http.get<Array<GrindingOfProcess>>(`${this.url}/grinding/${processId}`);
  }

  registerGrinding(grindings: GrindingItemToList[], formulationId: number): Observable<any> {
    return this.http.post<any>(`${this.url}/grinding/${formulationId}`, grindings);
  }
}

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Sausage } from "../models/sausage.interface";
import { SausageHour } from "../models/sausage-hour.interface";

@Injectable({ providedIn: "root" })
export class SausageService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint,
    @Inject(API_ENDPOINT_PROVIDER_MOCKUP) private endpointMockup
  ) {
    this.url = `${endpoint}`;
  }

  getDataSausage(processId): Observable<any> {
    return this.http.get<any>(`${this.url}/process/sausage/${processId}`);
  }

  registerSausage(sausage: Sausage, processId: number): Observable<any> {
    return this.http.post<any>(`${this.url}/process/sausage/${processId}`, {
      ...sausage,
    });
  }

  registerAnotherHour(hour: SausageHour, sausagedId: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/sausage/${sausagedId}`, {
      ...hour,
    });
  }
}

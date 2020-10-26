import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Sausage, SausageItemToList } from "../models/sausage.interface";
import { SausageHour } from "../models/sausage-hour.interface";
import { SausageHourRequest, SausageOfProcess } from '../models/sausage-page.interface';

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

  getDataSausage(processId): Observable<SausageOfProcess[]> {
    return this.http.get<SausageOfProcess[]>(`${this.url}/process/sausage/${processId}`);
  }

  registerSausage(sausages: SausageItemToList[], formulationId: number): Observable<any> {
    return this.http.post<any>(`${this.url}/process/sausage/${formulationId}`,
      sausages
    );
  }

  registerAnotherHour(sausagedId: number,sausageRequest:SausageHourRequest): Observable<any> {
    return this.http.put<any>(`${this.url}/process/sausage/${sausagedId}`,sausageRequest );
  }
}

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { NewProcess } from "../models/new-process.interface";
import { Defrost } from "../models/defrost.interface";

@Injectable({
  providedIn: "root",
})
export class BasicRegisterService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint,
    @Inject(API_ENDPOINT_PROVIDER_MOCKUP) private endpointMockup
  ) {
    this.url = `${endpoint}/process`;
  }

  basicRegisterProcess(newProcess: NewProcess): Observable<any> {
    console.log(newProcess);
    return this.http.post<any>(`${this.url}`, {
      ...newProcess,
    });
  }

  basicRegisterDefrost(processId, data: Defrost): Observable<any> {
    return this.http.patch<any>(`${this.url}/defrost/${processId}`, {
      ...data,
    });
  }
  getDefrostData(processId): Observable<any> {
    return this.http.get<any>(`${this.url}/${processId}`);
  }
}

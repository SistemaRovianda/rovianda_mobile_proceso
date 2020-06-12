import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Sausage } from "../models/sausage.interface";

@Injectable({ providedIn: "root" })
export class SausageService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/process`;
  }

  getDataSausage(processId): Observable<any> {
    return this.http.get<any>(`${this.url}/sausage/${processId}`);
  }

  registerSausage(tenderized: Sausage, processId: number): Observable<any> {
    console.log(tenderized);
    return this.http.post<any>(`${this.url}/sausage/${processId}`, {
      tenderized,
    });
  }
}

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Process } from "../models/process.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProcessService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint,
    @Inject(API_ENDPOINT_PROVIDER_MOCKUP) private endpointMockup
  ) {
    this.url = `${endpoint}/process`;
  }

  getProcess(status): Observable<Process[]> {
    return this.http.get<Process[]>(`${this.url}?status=${status}`);
  }
}

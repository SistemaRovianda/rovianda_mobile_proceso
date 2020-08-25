import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_ENDPOINT_PROVIDER,
  API_ENDPOINT_PROVIDER_MOCKUP,
} from "src/app/providers/tokens";
import { Process } from "../models/process.interface";
import { Observable } from "rxjs";
import { ProcessMetadata } from 'src/app/features/process/store/process-detail/process-detail.reducer';

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

  closeProcess(): Observable<any> {
    return this.http.patch<any>(
      `${this.url}/${localStorage.getItem("processId")}`,
      {}
    );
  }

  getProcessDetails(processId:number){
    return this.http.get<ProcessMetadata>(`${this.url}/${processId}`);
  }
}

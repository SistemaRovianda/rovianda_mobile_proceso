import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
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
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
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
    return this.http.patch<any>(`${this.url}/defrost/${processId}`, { data });
  }
  
}

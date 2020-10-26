import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { ReprocessingOfProcess } from "../models/reprocessing.interface";
import { ReprocessingToProcess } from "../models/reprocessingToProcess.interface";

@Injectable({ providedIn: "root" })
export class ReprocessingService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  getListReprocessing(processId:number) {
    return this.http.get<ReprocessingOfProcess[]>(`${this.url}/process/reprocesing/${processId}`);
  }

  registerReprocessing(reprocessing: ReprocessingToProcess[]): Observable<any> {
    return this.http.post<any>(`${this.url}/process-reprocesing`, reprocessing);
  }
}

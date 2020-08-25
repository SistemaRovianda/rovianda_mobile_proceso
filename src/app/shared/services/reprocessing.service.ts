import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Reprocessing } from "../models/reprocessing.interface";
import { ReprocessingToProcess } from "../models/reprocessingToProcess.interface";

@Injectable({ providedIn: "root" })
export class ReprocessingService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/packaging/reprocessing`;
  }

  getListReprocessing(area: string) {
    return this.http.get<Reprocessing[]>(`${this.url}/${area}`);
  }

  registerReprocessing(reprocessing: ReprocessingToProcess): Observable<any> {
    return this.http.post<any>(`${this.url}/lot`, { ...reprocessing });
  }
}

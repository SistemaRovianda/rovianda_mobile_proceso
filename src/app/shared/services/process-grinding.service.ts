import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Grinding } from "../models/grinding.interface";

@Injectable({ providedIn: "root" })
export class GrindingService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/process`;
  }

  getDataGrinding(processId): Observable<any> {
    return this.http.get<any>(`${this.url}/grinding/${processId}`);
  }

  registerGrinding(grinding: Grinding, processId: number): Observable<any> {
    return this.http.post<any>(`${this.url}/grinding/${processId}`, {
      grinding,
    });
  }
}

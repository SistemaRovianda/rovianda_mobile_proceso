import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class NewProccessService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/process/intern`;
  }

  newProcess(): Observable<any> {
    return this.http.post<any>(`${this.url}`, {});
  }
}

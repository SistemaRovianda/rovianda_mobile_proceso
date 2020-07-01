import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { UserInterface } from "../models/user.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserRegisterService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/process`;
  }

  getDataUserProcess(processId: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.url}/users/${processId}`);
  }

  registerUserProcess(user: UserInterface, processId: number) {
    return this.http.post<any>(`${this.url}/users/${processId}`, { ...user });
  }
}

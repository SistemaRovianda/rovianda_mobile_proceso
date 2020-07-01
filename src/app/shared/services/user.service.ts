import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { UserInterface } from "../models/user.interface";

@Injectable({ providedIn: "root" })
export class UserService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/user`;
  }

  getAllUser() {
    return this.http.get<UserInterface[]>(`${this.url}`);
  }
}

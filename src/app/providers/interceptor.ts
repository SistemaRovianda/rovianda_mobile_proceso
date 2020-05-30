import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../shared/models/store.state.interface";
import { SELECT_USER_TOKEN } from "../features/landing/store/authentication/authentication.selector";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class AuthorizationTokenInterceptor implements HttpInterceptor {
  token: string;

  constructor(private store: Store<AppState>) {
    this.store
      .select(SELECT_USER_TOKEN)
      .subscribe((token) => (this.token = token));
  }

  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", localStorage.getItem("token") || "");

    if (
      localStorage.getItem("token") != "" ||
      localStorage.getItem("token") != null
    ) {
      request = req.clone({
        headers: headers,
      });
    }
    return next.handle(request);
  }

}

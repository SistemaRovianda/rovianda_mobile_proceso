import { Injectable, Inject } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";

import Auth = firebase.auth.Auth;
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationUser } from "../models/store.state.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string;

  auth: Auth;

  constructor(
    private http: HttpClient,
    private _router: Router,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyDaoKnC-MSM0b069pawJ5KI1eWlbmng99o",
      authDomain: "rovianda-88249.firebaseapp.com",
    });

    this.auth = firebase.auth();

    this.url = `${environment.basePath}`;
  }

  signIn(email: string, password: string): Observable<any> {
    return from(
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) =>
          Promise.all([
            Promise.resolve(userCredentials.user.uid),
            Promise.resolve(userCredentials.user.refreshToken),
          ])
        )
    ).pipe(map(([uid, token]) => ({ uid, token })));
  }

  getUserData(uid: string): Observable<AuthenticationUser> {
    console.log(this.url);
    return this.http.get<AuthenticationUser>(`${this.url}/user/${uid}`);
  }

  isAuth(): boolean {
    return (
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") === "Proceso"
    );
  }

  getTokenCurrentUser(): Observable<any> {
    return from(
      this.auth.currentUser
        .getIdToken()
        .then((res) => {
          return Promise.all([Promise.resolve(res)]);
        })
        .catch((error) => {
          return Promise.all([error]);
        })
    ).pipe(map(([currentToken]) => ({ currentToken })));
  }

  signOut(): Observable<any> {
    localStorage.clear();
    return from(
      this.auth.signOut().then(() => {
        this._router.navigate(["/"], { replaceUrl: true });
      })
    );
  }
}

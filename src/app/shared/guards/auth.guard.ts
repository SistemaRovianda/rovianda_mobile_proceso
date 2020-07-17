import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      mergeMap(
        (val) => this._authService.verifyRole(),
        (val1, val2) => {
          console.log("[Auth] mergeMap: token: ", val1, "role: ", val2);
          return val1 && val2 ? true : false;
        }
      )
    );
  }
}

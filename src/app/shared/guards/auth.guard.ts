import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._authService.isAuth()) {
      return true;
    }
    this.router.navigate([""], { replaceUrl: true });
    return false;
  }
}

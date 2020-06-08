import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import * as fromLoginActions from "./login.action";
import * as fromAuthenticationUser from "../authentication/authentication.action";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { of, from } from "rxjs";

@Injectable()
export class LoginEffects {
  constructor(
    private action$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  signInEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signIn),
      exhaustMap((action) =>
        this.authService.signIn(action.email, action.password).pipe(
          switchMap(({ uid, token }) => [
            fromLoginActions.startLoad(),
            fromAuthenticationUser.loadUser({ uid, token }),
            fromAuthenticationUser.loadCurrentToken({ uid }),
          ]),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  loadCurrentTokenUserEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthenticationUser.loadCurrentToken),
      exhaustMap((action) =>
        this.authService.getTokenCurrentUser().pipe(
          switchMap(({ currentToken }) => {
            localStorage.setItem("token", currentToken);
            return [
              fromAuthenticationUser.loadUser({ currentToken }),
              fromLoginActions.signAuthSuccess({ uid: action.uid }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error: error.error })
            )
          )
        )
      )
    )
  );

  signAuthSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signAuthSuccess),
      exhaustMap((action) =>
        this.authService.getUserData(action.uid).pipe(
          switchMap(({ email, name, rol }) => {
            localStorage.setItem("role", rol);
            return [
              fromAuthenticationUser.loadUser({ email, name, rol }),
              fromLoginActions.singInSuccess(),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error })
            )
          )
        )
      )
    )
  );

  signInSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.singInSuccess),
      exhaustMap(() =>
        from(this.router.navigate(["/"])).pipe(
          switchMap((result) =>
            result
              ? [fromLoginActions.finishLoad()]
              : [fromLoginActions.signInFailure({ error: "Usuario no valido" })]
          ),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error })
            )
          )
        )
      )
    )
  );

  signOutEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signOut),
      exhaustMap((action) =>
        this.authService.signOut().pipe(
          switchMap((aciton) => [fromAuthenticationUser.clearUser()]),
          catchError((error) => of(fromLoginActions.signInFailure({ error })))
        )
      )
    )
  );
}

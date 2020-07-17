import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import * as fromLoginActions from "./login.action";
import * as fromAuthenticationUser from "../authentication/authentication.action";
import { exhaustMap, switchMap, catchError, tap } from "rxjs/operators";
import { of, from } from "rxjs";
import { Storage } from "@ionic/storage";

@Injectable()
export class LoginEffects {
  constructor(
    private action$: Actions,
    private router: Router,
    private authService: AuthService,
    private _storage: Storage
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
            this._storage.set("token", currentToken);
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
          switchMap(({ email, name, rol, job, firstSurname, lastSurname }) => {
            this._storage.set("role", rol);
            this._storage.set(
              "currentUser",
              name + " " + firstSurname + " " + lastSurname
            );
            return [
              fromAuthenticationUser.loadUser({
                email,
                name,
                rol,
                job,
                firstSurname,
                lastSurname,
              }),
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
        from(this.router.navigate(["/process/recent-records"])).pipe(
          tap((o) => console.log(o)),
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

  signInFailureEffect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromLoginActions.signInFailure),
        tap((action) => localStorage.clear())
      ),
    {
      dispatch: false,
    }
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

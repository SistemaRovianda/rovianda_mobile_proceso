import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/shared/services/user.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import * as fromUserActions from "./user.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { of, from } from "rxjs";
import { UserRegisterService } from "src/app/shared/services/proccess-user.service";

@Injectable()
export class UsersEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private userRegisterService: UserRegisterService,
    private toast: ToastService,
    private router: Router
  ) {}

  loadUsers = createEffect(() =>
    this.action$.pipe(
      ofType(fromUserActions.userStartLoadUsers),
      exhaustMap((action) =>
        this.userService.getAllUser().pipe(
          switchMap((users) => [fromUserActions.userLoadUsers({ users })]),
          catchError((error) =>
            of(fromUserActions.userRegisterFailure({ error }))
          )
        )
      )
    )
  );

  loadDataUser = createEffect(() =>
    this.action$.pipe(
      ofType(fromUserActions.userSearchInformation),
      exhaustMap((action) =>
        this.userRegisterService.getDataUserProcess(action.processId).pipe(
          switchMap((user) =>
            Object.keys(user).length > 0 &&
            user.jobElaborated != null &&
            user.jobVerify != null &&
            user.nameVerify != null &&
            user.nameElaborated != null
              ? [
                  fromUserActions.userLoadData({ user }),
                  fromUserActions.userIsSelected({ isSelected: true }),
                ]
              : [fromUserActions.userLoadData({ user: null })]
          ),
          catchError((error) => {
            return of(
              fromUserActions.userRegisterFailure({ error: error.error.msg })
            );
          })
        )
      )
    )
  );

  registerUser = createEffect(() =>
    this.action$.pipe(
      ofType(fromUserActions.userRegister),
      exhaustMap((user) =>
        this.userRegisterService
          .registerUserProcess(user, +localStorage.getItem("processId"))
          .pipe(
            switchMap((action) => {
              this.toast.presentToastSuccess();
              return [
                fromUserActions.userRegisterResult({ result: true }),
                fromUserActions.userRegisterFinish(),
                fromUserActions.userRegisterSuccess(),
              ];
            }),
            catchError((error) => {
              return of(
                fromUserActions.userRegisterFailure({ error: error.error.msg }),
                fromUserActions.userRegisterFinish()
              );
            })
          )
      )
    )
  );

  registerUserSuccess = createEffect(() =>
    this.action$.pipe(
      ofType(fromUserActions.userRegisterSuccess),
      exhaustMap(() =>
        from(this.router.navigate(["/process/process-detail"])).pipe(
          switchMap((result) =>
            result
              ? [fromUserActions.userRegisterFinish()]
              : [
                  fromUserActions.userRegisterFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}

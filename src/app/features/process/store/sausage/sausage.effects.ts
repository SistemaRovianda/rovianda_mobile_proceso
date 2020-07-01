import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError, of, from } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";
import { SausageService } from "src/app/shared/services/process-sausage.service";
import * as fromSausageActions from "./sausage.actions";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";

@Injectable()
export class SausageEffects {
  constructor(
    private action$: Actions,
    private sausageService: SausageService,
    private toast: ToastService,
    private router: Router
  ) {}

  loadDataSausage = createEffect(() =>
    this.action$.pipe(
      ofType(fromSausageActions.sausageSearchInformation),
      exhaustMap((action) =>
        this.sausageService.getDataSausage(action.processId).pipe(
          switchMap((sausage) =>
            Object.keys(sausage).length > 0
              ? [
                  fromSausageActions.sausageLoadData({ sausage }),
                  fromSausageActions.sausageIsSelected({ isSelected: true }),
                ]
              : [fromSausageActions.sausageLoadData({ sausage: null })]
          ),
          catchError((error) => {
            return of(
              fromSausageActions.sausageRegisterFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  registerSausage = createEffect(() =>
    this.action$.pipe(
      ofType(fromSausageActions.sausageRegister),
      exhaustMap((sausage) =>
        this.sausageService
          .registerSausage(sausage, +localStorage.getItem("processId"))
          .pipe(
            switchMap((action) => {
              this.toast.presentToastSuccess();
              return [
                fromSausageActions.sausageRegisterResults({
                  result: true,
                }),
                fromSausageActions.sausageFinish(),
                fromSausageActions.sausageRegisterSuccess(),
              ];
            }),
            catchError((error) => {
              this.toast.presentToastError();
              fromSausageActions.sausageRegisterResults({
                result: false,
              });
              return of(
                fromSausageActions.sausageRegisterFailure({
                  error: error.error.msg,
                }),
                fromSausageActions.sausageFinish()
              );
            })
          )
      )
    )
  );

  registerSausageSuccess = createEffect(() =>
    this.action$.pipe(
      ofType(fromSausageActions.sausageRegisterSuccess),
      exhaustMap(() =>
        from(this.router.navigate(["/process/process-detail"])).pipe(
          switchMap((result) =>
            result
              ? [fromSausageActions.sausageFinish()]
              : [
                  fromSausageActions.sausageRegisterFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}

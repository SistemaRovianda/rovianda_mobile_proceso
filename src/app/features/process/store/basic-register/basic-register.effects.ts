import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeatService } from "src/app/shared/services/meat.service";
import * as fromBasicRegisterActions from "./basic-register.actions";
import { exhaustMap, switchMap, catchError, tap } from "rxjs/operators";
import { BasicRegisterService } from "src/app/shared/services/process-basic-register.service";
import { of, throwError, from } from "rxjs";
import { RawMaterialService } from "src/app/shared/services/rawMaterial.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";

@Injectable()
export class BasicRegisterEffect {
  constructor(
    private action$: Actions,
    private meatService: MeatService,
    private basicRegisterService: BasicRegisterService,
    private router: Router,
    private rawMaterialService: RawMaterialService,
    private toastService: ToastService
  ) {}

  loadLotsMeatEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterSelectMaterial),
      exhaustMap((action) =>
        this.meatService.getLotsMeat(action.status, action.rawMaterialId).pipe(
          switchMap((lots) => {
            return [
              fromBasicRegisterActions.basicRegisterLoadLotsOutputMeat({
                lots,
              }),
            ];
          })
        )
      )
    )
  );

  regiterNewProcess = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterStartRegisterNewProcess),
      exhaustMap((action) =>
        this.basicRegisterService.basicRegisterProcess(action.newProcess).pipe(
          switchMap((action) => {
            this.toastService.presentToastSuccess();
            return [
              fromBasicRegisterActions.basicRegisterLoadResultsNewRegisterProcess(
                { result: true }
              ),
              fromBasicRegisterActions.basicRegisterNewRegisterProcessSucess(),
            ];
          }),
          catchError((error) => {
            this.toastService.presentToastMessageWarning(error.error.msg);
            return of(
              fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess(),
              fromBasicRegisterActions.basicRegisterNewProcessFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  registerNewProcessSuccessEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterNewRegisterProcessSucess),
      exhaustMap(() =>
        from(this.router.navigate(["/process/recent-records"])).pipe(
          switchMap((result) =>
            result
              ? [
                  fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess(),
                ]
              : [
                  fromBasicRegisterActions.basicRegisterNewProcessFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );

  loadMaterialEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterStartLoadMaterials),
      exhaustMap((action) =>
        this.rawMaterialService.getMaterials().pipe(
          switchMap((materials) => [
            fromBasicRegisterActions.basicRegisterLoadMaterials({
              materials,
            }),
          ])
        )
      )
    )
  );

  registerDefrostEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterRegisterDefrostProcess),
      exhaustMap((action) =>
        this.basicRegisterService
          .basicRegisterDefrost(action.processId, action.defrost)
          .pipe(
            switchMap((action) => {
              this.toastService.presentToastSuccess();
              return [
                fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess(),
                fromBasicRegisterActions.basicRegisterRegisterDefrostProcessSuccess(),
              ];
            })
          )
      )
    )
  );

  registerDefrostProcessSuccessEffect = createEffect(() =>
    this.action$.pipe(
      ofType(
        fromBasicRegisterActions.basicRegisterRegisterDefrostProcessSuccess
      ),
      exhaustMap(() =>
        from(this.router.navigate(["/process/process-detail"])).pipe(
          switchMap((result) =>
            result
              ? [
                  fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess(),
                ]
              : [
                  fromBasicRegisterActions.basicRegisterNewProcessFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}

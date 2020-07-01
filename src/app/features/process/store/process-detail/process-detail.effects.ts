import { Injectable } from "@angular/core";
import { ProductsCatalogService } from "src/app/shared/services/products-catalog.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as fromProcessDetailActions from "./process-detail.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { ProcessService } from "src/app/shared/services/process.service";
import { of } from "rxjs/internal/observable/of";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import { from } from "rxjs";

@Injectable()
export class ProcessDetailEffect {
  processId;
  constructor(
    private productCatalogService: ProductsCatalogService,
    private actions$: Actions,
    private processService: ProcessService,
    private toast: ToastService,
    private router: Router
  ) {}

  loadProductsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProcessDetailActions.processDetailStartLoadProducts),
      exhaustMap((action) =>
        this.productCatalogService
          .getAllProducts()
          .pipe(
            switchMap((products) => [
              fromProcessDetailActions.processDetailLoadProducts({ products }),
            ])
          )
      )
    )
  );

  closeProcess = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProcessDetailActions.processDetailStartCloseProcess),
      exhaustMap((action) =>
        this.processService.closeProcess().pipe(
          switchMap((action) => {
            this.toast.presentToastSuccess();
            return [
              fromProcessDetailActions.processDetailCloseProcessFinish(),
              fromProcessDetailActions.processDetailCloseProcessSuccess(),
            ];
          }),
          catchError((error) => {
            this.toast.presentToastError();
            return of(
              fromProcessDetailActions.processDetailCloseProcessFinish(),
              fromProcessDetailActions.processDetailCloseProcessFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  closeProcessSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProcessDetailActions.processDetailCloseProcessSuccess),
      exhaustMap(() =>
        from(this.router.navigate(["/process/recent-records"])).pipe(
          switchMap((result) =>
            result
              ? [fromProcessDetailActions.processDetailCloseProcessFinish()]
              : [
                  fromProcessDetailActions.processDetailCloseProcessFailure({
                    error: "No Autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}

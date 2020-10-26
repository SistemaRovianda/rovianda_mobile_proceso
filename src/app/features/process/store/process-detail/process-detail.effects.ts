import { Injectable } from "@angular/core";
import { ProductsCatalogService } from "src/app/shared/services/products-rovianda-catalog.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as fromProcessDetailActions from "./process-detail.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { ProcessService } from "src/app/shared/services/process.service";
import { of } from "rxjs/internal/observable/of";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { RawMaterialService } from "src/app/shared/services/raw-material.service";
import { ProductsRoviandaService } from "src/app/shared/services/products-rovianda.service";
import { create } from "domain";
import { LotMeatService } from "src/app/shared/services/lot-meat.service";
import { Process } from 'src/app/shared/models/process.interface';
import { getProcessDetails } from './process-detail.actions';
import { ProcessMetadata } from './process-detail.reducer';

@Injectable()
export class ProcessDetailEffect {
  processId;
  constructor(
    private productCatalogService: ProductsCatalogService,
    private actions$: Actions,
    private processService: ProcessService,
    private toast: ToastService,
    private router: Router,
    private rawMaterialService: RawMaterialService,
    private productsRoviandaService: ProductsRoviandaService,
    private lotsMeatProcessService: LotMeatService
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
      exhaustMap(() => {
        return from(this.router.navigate(["/process/report"])).pipe(
          switchMap((result) =>
            result
              ? [fromProcessDetailActions.processDetailCloseProcessFinish()]
              : [
                  fromProcessDetailActions.processDetailCloseProcessFailure({
                    error: "No Autorizado",
                  }),
                ]
          )
        );
      })
    )
  );

 

  loadProductsRovianda = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProcessDetailActions.processDetailStartLoadProductsRovianda),
      exhaustMap((action) =>
        this.productsRoviandaService.getAllProductsRovianda().pipe(
          switchMap((productsRovianda) => [
            fromProcessDetailActions.processDetailLoadProductsRovianda({
              productsRovianda: productsRovianda.filter(
                (product) => product.status === true
              ),
            }),
          ])
        )
      )
    )
  );

  // loadLotsMeatProcess = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromProcessDetailActions.processDetailStartLoadLotsMeatProcess),
  //     exhaustMap((action) =>
  //       this.lotsMeatProcessService
  //         .getLotsMeatProcess()
  //         .pipe(
  //           switchMap((lotsMeatProcess) => [
  //             fromProcessDetailActions.processDetailLoadLotsMeatProcess({
  //               lotsMeatProcess,
  //             }),
  //           ])
  //         )
  //     )
  //   )
  // );

  getProcessDetailsEffect = createEffect(()=>
  this.actions$.pipe(
    ofType(getProcessDetails),
    exhaustMap((action)=>this.processService.getProcessDetails(+localStorage.getItem("processId")).pipe(
      switchMap((process:ProcessMetadata)=>[fromProcessDetailActions.setProcessDetails({process})]),
      catchError(()=>[fromProcessDetailActions.setProcessDetails({process:null})])
    ))
  ))
}

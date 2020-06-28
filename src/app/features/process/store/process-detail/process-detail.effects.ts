import { Injectable } from "@angular/core";
import { ProductsCatalogService } from "src/app/shared/services/products-catalog.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as fromProcessDetailActions from "./process-detail.actions";
import { exhaustMap, switchMap } from "rxjs/operators";
import { SELECT_RECENT_RECORDS_PROCESS_PROCESS_ID } from "../recent-records/recent-records.selector";

@Injectable()
export class ProcessDetailEffect {
  processId;
  constructor(
    private productCatalogService: ProductsCatalogService,
    private actions$: Actions,
  ) {
  }

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
}

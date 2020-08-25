import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import {
  SELECT_SAUSAGE_RESULT,
  SELECT_SAUSAGE_IS_LOADING,
  SELECT_SAUSAGE_IS_SELECTED,
} from "../../store/sausage/sausage.selector";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";
import { Observable } from "rxjs";
import {
  SELECT_PROCESS_DETAIL_PRODUCTS,
  SELECT_PROCESS_DETAIL_LOTS_MEAT,
} from "../../store/process-detail/process-detail.selector";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
import { SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS } from "../../store/recent-records/recent-records.selector";

@Component({
  selector: "app-sausage",
  templateUrl: "./sausage.page.html",
  styleUrls: ["./sausage.page.scss"],
})
export class SausagePage implements OnInit {
  products$: Observable<ProductCatalog[]> = this.store.select(
    SELECT_PROCESS_DETAIL_PRODUCTS
  );
  lotsMeat$: Observable<ProcessLotMeat[]> = this.store.select(
    SELECT_PROCESS_DETAIL_LOTS_MEAT
  );

  constructor(
    private alert: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  result: boolean;

  loading: boolean;

  isSelected: boolean;

  isSelectedProcess: boolean;

  ngOnInit() {
    this.store
      .select(SELECT_SAUSAGE_RESULT)
      .subscribe((tempResult) => (this.result = tempResult));
    this.store
      .select(SELECT_SAUSAGE_IS_LOADING)
      .subscribe((loading) => (this.loading = loading));
    this.store
      .select(SELECT_SAUSAGE_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
      .subscribe((selected) => (this.isSelectedProcess = selected));
  }
  onBackButton(form) {
    const buttons: any = [
      {
        text: "Cancelar",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
          form.form.reset();
          this.redirectBack();
        },
      },
    ];
    if (form.fieldsRequireds && this.isSelected) {
      form.form.reset();
      this.redirectBack();
    } else if (form.fieldsRequireds && !this.result) {
      this.alert.showAlert(
        "Informacion",
        "",
        "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
        buttons
      );
    } else if (!form.fieldsRequireds) {
      form.form.reset();
      this.redirectBack();
    }
  }

  redirectBack() {
    this.router.navigate([`/process/process-detail`]);
  }
  reprocessing() {
    this.router.navigate([`/process/reprocessing`]);
  }
}

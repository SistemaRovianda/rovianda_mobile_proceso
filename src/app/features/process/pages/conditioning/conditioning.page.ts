import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import {
  SELECT_CONDITIONING_RESULT,
  SELECT_CONDITIONING_IS_LOADING,
  SELECT_CONDITIONING_IS_SELECTED,
} from "../../store/conditioning/conditioning.selector";
import { Observable } from "rxjs";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";
import { SELECT_PROCESS_DETAIL_PRODUCTS } from "../../store/process-detail/process-detail.selector";

@Component({
  selector: "app-conditioning",
  templateUrl: "./conditioning.page.html",
  styleUrls: ["./conditioning.page.scss"],
})
export class ConditioningPage implements OnInit {
  constructor(
    private alert: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  result: boolean;

  loading: boolean;

  isSelected: boolean;

  products$: Observable<ProductCatalog[]> = this.store.select(
    SELECT_PROCESS_DETAIL_PRODUCTS
  );
  ngOnInit() {
    this.store
      .select(SELECT_CONDITIONING_RESULT)
      .subscribe((tempResult) => (this.result = tempResult));
    this.store
      .select(SELECT_CONDITIONING_IS_LOADING)
      .subscribe((loading) => (this.loading = loading));
    this.store
      .select(SELECT_CONDITIONING_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
  }

  onBackButton(form) {
    const buttons: any = [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
          form.reset();
          this.redirectBack();
        },
      },
    ];
    if (form.valid && this.isSelected) {
      form.reset();
      this.redirectBack();
    } else if (form.valid && !this.result) {
      this.alert.showAlert(
        "Informacion",
        "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
        buttons
      );
    } else if (form.invalid) {
      form.reset();
      this.redirectBack();
    }
  }

  onNextButton(form) {
    if (form.valid && !this.result) {
      this.alert.showAlert(
        "Informacion",
        "Primero se tiene que guardar la información ingresada",
        ["Aceptar"]
      );
    } else if (this.result || form.invalid) {
      this.redirectNext();
    }
  }

  redirectBack() {
    this.router.navigate([`/process/process-detail`]);
  }

  redirectNext() {
    this.router.navigate([`/process/grinding`]);
  }
}

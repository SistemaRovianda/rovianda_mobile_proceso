import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { LotMeatOutput } from "src/app/shared/models/Lot-meat-output.interface";
import { Observable } from "rxjs";
import {
  SELECT_BASIC_REGISTER_LOTS,
  SELECT_BASIC_REGISTER_RESULT,
  SELECT_BASIC_REGISTER_MATERIALS,
  SELECT_BASIC_REGISTER_IS_LOADING,
} from "../../store/basic-register/basic-register.select";
import { NewProcess } from "src/app/shared/models/new-process.interface";
import * as fromBasicRegisterActions from "../../store/basic-register/basic-register.actions";
import { Router } from "@angular/router";
import { AlertService } from "src/app/shared/services/alert.service";
import { RawMaterial } from "src/app/shared/models/rawMaterial.interface";
import { SELECT_RECENT_RECORDS_IS_SELECTED } from "../../store/recent-records/recent-records.selector";
import { Defrost } from "src/app/shared/models/defrost.interface";

@Component({
  selector: "app-basic-registration",
  templateUrl: "./basic-registration.page.html",
  styleUrls: ["./basic-registration.page.scss"],
})
export class BasicRegistrationPage implements OnInit {
  materials$: Observable<RawMaterial[]> = this.store.select(
    SELECT_BASIC_REGISTER_MATERIALS
  );

  title = "Informativo";

  message = "Informacion";

  buttons = ["Aceptar"];

  result: boolean;

  loading: boolean;

  isSelected: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.store
      .select(SELECT_BASIC_REGISTER_RESULT)
      .subscribe((tempResult) => (this.result = tempResult));
    this.store
      .select(SELECT_BASIC_REGISTER_IS_LOADING)
      .subscribe((loading) => (this.loading = loading));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
  }

  onSubmit(newProcess: NewProcess) {
    this.store.dispatch(
      fromBasicRegisterActions.basicRegisterStartRegisterNewProcess({
        newProcess,
      })
    );
  }

  onDefrost(defrost) {
    this.store.dispatch(
      fromBasicRegisterActions.basicRegisterRegisterDefrostProcess({
        defrost: defrost.defrost,
        processId: defrost.processId,
      })
    );
  }

  onBackButton(form) {
    if (form.form.invalid) {
      this.redirectBack();
    } else if (form.form.valid && !this.result) {
      const buttons: any = [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Aceptar",
          handler: () => {
            form.onBack = true;
            form.form.reset();
            this.redirectBack();
          },
        },
      ];

      this.alert.showAlert(
        "Informacion",
        "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
        buttons
      );
    } else if (form.form.valid && this.result) {
      form.form.reset();
      this.router.navigate([`/process/process-detail`]);
    }
  }

  redirectBack() {
    this.router.navigate([`/process/recent-records`]);
  }
}

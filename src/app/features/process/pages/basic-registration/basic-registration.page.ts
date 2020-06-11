import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { LotMeatOutput } from "src/app/shared/models/Lot-meat-output.interface";
import { Observable } from "rxjs";
import {
  SELECT_BASIC_REGISTER_LOTS,
  SELECT_BASIC_REGISTER_RESULT,
} from "../../store/basic-register/basic-register.select";
import { NewProcess } from "src/app/shared/models/new-process.interface";
import * as fromBasicRegisterActions from "../../store/basic-register/basic-register.actions";
import { Router } from "@angular/router";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: "app-basic-registration",
  templateUrl: "./basic-registration.page.html",
  styleUrls: ["./basic-registration.page.scss"],
})
export class BasicRegistrationPage implements OnInit {
  lots$: Observable<LotMeatOutput[]> = this.store.select(
    SELECT_BASIC_REGISTER_LOTS
  );

  title = "Informativo";

  message = "Informacion";

  buttons = ["Aceptar"];

  result: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.store
      .select(SELECT_BASIC_REGISTER_RESULT)
      .subscribe((tempResult) => (this.result = tempResult));
  }

  onSubmit(newProcess: NewProcess) {
    this.store.dispatch(
      fromBasicRegisterActions.basicRegisterStartRegisterNewProcess({
        newProcess,
      })
    );
  }

  onBackButton(form) {
    if (form.invalid) {
      this.redirectBack();
    } else if (!form.invalid && !this.result) {
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

      this.alert.showAlert(
        "Informacion",
        "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
        buttons
      );
    }
  }
  onNextButton(form) {
    if (form.invalid) {
      this.alert.showAlert(
        "Informacion",
        "No existe información básica registrada, las secciones son independientes, pero se requiere mínimo la información básica",
        ["Aceptar"]
      );
    } else if (!form.invalid && !this.result) {
      this.alert.showAlert(
        "Informacion",
        "Primero se tiene que guardar la información ingresada",
        ["Aceptar"]
      );
    } else if (this.result) {
      this.redirectNext();
    }
  }

  redirectNext() {
    this.router.navigate([`/process/conditioning`]);
  }

  redirectBack() {
    this.router.navigate([`/process/recent-records`]);
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserInterface } from "src/app/shared/models/user.interface";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import {
  SELECT_USERS,
  SELECT_USER_RESULT,
  SELECT_USER_IS_LOADING,
  SELECT_USER_IS_SELECTED,
} from "../../store/user/user.selector";
import { Observable } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"],
})
export class UserPage implements OnInit {
  users$: Observable<UserInterface[]> = this.store.select(SELECT_USERS);
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private alert: AlertService
  ) {}

  result: boolean;

  loading: boolean;

  isSelected: boolean;

  ngOnInit() {
    this.store
      .select(SELECT_USER_RESULT)
      .subscribe((tempResult) => (this.result = tempResult));
    this.store
      .select(SELECT_USER_IS_LOADING)
      .subscribe((loading) => (this.loading = loading));
    this.store
      .select(SELECT_USER_IS_SELECTED)
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
      this.redirectBack();
    }
  }

  redirectBack() {
    this.router.navigate([`/process/process-detail`]);
  }
  createReport() {
    this.router.navigate([`/process/report`]);
  }
}

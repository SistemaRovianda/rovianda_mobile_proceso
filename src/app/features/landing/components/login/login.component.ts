import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import {
  ERROR_EMAIL_NOT_FOUND,
  ERROR_PASSWORD_INVALID,
} from "src/app/providers/const";
import {
  SELECT_IS_LOADING,
  SELECT_LOGIN_ERROR,
} from "../../store/login/login.selector";
import { StoreValidator } from "src/app/shared/validators/store.validator";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  loading: boolean;

  // tslint:disable-next-line: no-output-rename
  @Output("onSubmit") submit = new EventEmitter();

  constructor(private fb: FormBuilder, private _store: Store<AppState>) {
    this.loading = false;
    this.form = fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
      },
      {
        asyncValidators: [
          StoreValidator.hasStoreError(
            this._store.select(SELECT_LOGIN_ERROR),
            "loginError"
          ),
        ],
      }
    );
  }

  ngOnInit() {
    this._store
      .select(SELECT_IS_LOADING)
      .subscribe((res) => (this.loading = res));
  }

  translateError(errorMessage: string): string {
    if (errorMessage == ERROR_EMAIL_NOT_FOUND) {
      return "Correo no registrado.";
    }
    if (errorMessage == ERROR_PASSWORD_INVALID) {
      return "Contraseña invalida.";
    }
    if (errorMessage == "Usuario no valido") {
      return "Usuario no valido";
    }
    return "Varios intentos fallidos, consulte con el administrador o intente mas tarde";
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

  onSubmit(): void {
    this.submit.emit(this.form.value);
  }

  shouldDisabled(): boolean {
    return this.form.invalid || this.form.pending;
  }
}

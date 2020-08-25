import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { UserInterface } from "src/app/shared/models/user.interface";
import {
  SELECT_USER_DATA,
  SELECT_USER_IS_SELECTED,
} from "../../store/user/user.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import { userRegister } from "../../store/user/user.actions";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-form-users",
  templateUrl: "./form-users.component.html",
  styleUrls: ["./form-users.component.scss"],
})
export class FormUsersComponent implements OnInit {
  user: UserInterface;

  form: FormGroup;

  @Input() users: UserInterface[];

  @Output("onSubmit") submit = new EventEmitter();

  isSelected: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService,
    private storage: Storage
  ) {
    this.form = fb.group({
      nameElaborated: ["", Validators.required],
      jobElaborated: ["", Validators.required],
      nameVerify: ["", Validators.required],
      jobVerify: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.storage
      .get("currentUser")
      .then((user) => this.nameElaborated.setValue(user));
    this.storage.get("job").then((job) => this.jobElaborated.setValue(job));

    this.store.select(SELECT_USER_DATA).subscribe((tempUser) => {
      if (tempUser != null) {
        this.user = tempUser;
        this.updateForm();
      }
    });
    this.store
      .select(SELECT_USER_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
  }

  selectVerify() {
    this.jobVerify.setValue(this.nameVerify.value.job);
  }

  onSubmit() {
    const buttons: any = [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
          this.registerUser();
        },
      },
    ];
    if (this.form.valid) {
      this.alert.showAlert(
        "Informacion",
        "",
        "Una vez guardada la información no podrá ser modificada, ¿Deseas guardar la información?",
        buttons
      );
    }
  }

  updateForm() {
    const { ...values } = this.user;

    this.form.patchValue({
      ...values,
    });
  }

  registerUser() {
    const { nameVerify, ...values } = this.form.value;

    this.store.dispatch(
      userRegister({ ...values, nameVerify: nameVerify.fullName })
    );
  }

  get nameElaborated() {
    return this.form.get("nameElaborated");
  }

  get nameVerify() {
    return this.form.get("nameVerify");
  }
  get jobElaborated() {
    return this.form.get("jobElaborated");
  }
  get jobVerify() {
    return this.form.get("jobVerify");
  }
}

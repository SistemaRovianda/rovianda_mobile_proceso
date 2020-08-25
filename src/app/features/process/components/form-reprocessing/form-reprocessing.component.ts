import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { Reprocessing } from "src/app/shared/models/reprocessing.interface";
import { SELECT_RECENT_RECORDS_PROCESS_SELECTED } from "../../store/recent-records/recent-records.selector";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: "app-form-reprocessing",
  templateUrl: "./form-reprocessing.component.html",
  styleUrls: ["./form-reprocessing.component.scss"],
})
export class FormReprocessingComponent implements OnInit {
  @Input() listReprocessing: Reprocessing[] = [];
  @Output("onSubmit") submit = new EventEmitter();
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      date: ["", Validators.required],
      allergens: ["", Validators.required],
      loteReprocessing: ["", Validators.required],
      loteProcess: ["", Validators.required],
    });
  }
  ngOnInit() {
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SELECTED)
      .subscribe((selected) => {
        if (selected !== null) {
          this.loteProcess.setValue(selected.lotId);
        }
      });
  }

  selectReprocessing() {
    const { ...values } = this.loteReprocessing.value;
    this.allergens.setValue(this.loteReprocessing.value.allergens);
    this.date.setValue(this.loteReprocessing.value.date);
  }

  onSubmit() {
    const buttons: any = [
      {
        text: "Cancelar",
        role: "cancel",
      },
      {
        text: "Asignar",
        handler: () => {
          this.asignprocess();
        },
      },
    ];
    this.alert.showAlert(
      "Informacion",
      "",
      "¿Asignar reproceso al proceso actual?",
      buttons
    );
    console.log(this.form.value);
  }

  asignprocess() {
    const { loteReprocessing, loteProcess } = this.form.value;

    const payload = {
      loteProcess,
      reprocessingId: loteReprocessing.reprocessingId,
    };
    this.submit.emit(payload);
  }

  get loteReprocessing() {
    return this.form.get("loteReprocessing");
  }

  get date() {
    return this.form.get("date");
  }

  get allergens() {
    return this.form.get("allergens");
  }
  get loteProcess() {
    return this.form.get("loteProcess");
  }
}

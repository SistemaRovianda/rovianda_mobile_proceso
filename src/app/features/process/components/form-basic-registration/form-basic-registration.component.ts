import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { stepperNextStep } from "../../store/stepper/stepper.action";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import { LotMeatOutput } from "src/app/shared/models/Lot-meat-output.interface";
import { NewProcess } from "src/app/shared/models/new-process.interface";
import { Observable } from "rxjs";
import {
  SELECT_RECENT_RECORDS_PROCESS,
  SELECT_RECENT_RECORDS_PROCESS_SELECTED,
} from "../../store/recent-records/recent-records.selector";
import { Process } from "src/app/shared/models/process.interface";

@Component({
  selector: "app-form-basic-registration",
  templateUrl: "./form-basic-registration.component.html",
  styleUrls: ["./form-basic-registration.component.scss"],
})
export class FormBasicRegistrationComponent implements OnInit {
  form: FormGroup;
  @Input() lots: LotMeatOutput[];
  @Output("onSubmit") submit = new EventEmitter();

  @Output("onDefrost") defrost = new EventEmitter();

  process: Process;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      productId: ["", Validators.required],
      lotId: ["", Validators.required],
      weight: ["", Validators.required],
      temperature: ["", Validators.required],
      hourEntrance: [new Date().toISOString(), Validators.required],
      hourExit: [new Date().toISOString(), Validators.required],
      dateIni: [new Date().toISOString(), Validators.required],
      dateFinal: [""],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SELECTED)
      .subscribe((tempProcess) => {
        if (tempProcess != null) {
          this.process = tempProcess;
          this.updateForm();
        }
      });
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 0, step: !this.form.invalid }));
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
          this.registerNewProcess();
        },
      },
    ];
    if (this.dateFinal.value === "" && !this.form.invalid) {
      this.alert.showAlert(
        "Informacion",
        "Los campos opcionales, deberán igual ser llenados al salir la carne del descongelamiento",
        buttons
      );
    } else if (!this.form.invalid) {
      this.registerNewProcess();
    }
  }

  private registerNewProcess() {
    const {
      lotId,
      dateIni,
      dateFinal,
      hourEntrance,
      hourExit,
      ...value
    } = this.form.value;
    const payload = {
      lote: lotId,
      dateIni: moment(dateIni).format("YYYY-MM-DD"),
      hourEntrance: moment(hourEntrance).format("HH:mm"),
      ...value,
    };

    this.submit.emit(payload);
  }

  private updateForm() {}

  get dateFinal() {
    return this.form.get("dateFinal");
  }
}

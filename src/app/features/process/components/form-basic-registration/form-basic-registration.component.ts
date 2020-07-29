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
  SELECT_RECENT_RECORDS_IS_SELECTED,
} from "../../store/recent-records/recent-records.selector";
import { Process } from "src/app/shared/models/process.interface";
import { RawMaterial } from "src/app/shared/models/rawMaterial.interface";
import { basicRegisterSelectMaterial } from "../../store/basic-register/basic-register.actions";
import { SELECT_BASIC_REGISTER_LOTS } from "../../store/basic-register/basic-register.select";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";

@Component({
  selector: "app-form-basic-registration",
  templateUrl: "./form-basic-registration.component.html",
  styleUrls: ["./form-basic-registration.component.scss"],
})
export class FormBasicRegistrationComponent implements OnInit {
  form: FormGroup;

  @Input() materials: RawMaterial[];

  lots: LotMeatOutput[];

  @Output("onSubmit") submit = new EventEmitter();

  @Output("onDefrost") defrost = new EventEmitter();

  isSelected: boolean;

  datesRegistered = false;

  process: Process;

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      productId: ["", Validators.required],
      lotId: ["", Validators.required],
      weight: ["", [Validators.required, decimalValidator]],
      temperature: ["", Validators.required],
      hourEntrance: [new Date().toISOString(), Validators.required],
      hourExit: [],
      dateIni: [this.minDate, Validators.required],
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
          this.datesRegistered =
            this.process.end_date !== "" && this.process.output_hour !== "";
          this.updateForm();
        }
      });
    this.store
      .select(SELECT_BASIC_REGISTER_LOTS)
      .subscribe((lots) => (this.lots = lots));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 0, step: !this.form.invalid }));
  }

  selectMaterial() {
    this.lotId.setValue("");
    this.store.dispatch(
      basicRegisterSelectMaterial({
        status: "NOTUSED",
        rawMaterialId: this.productId.value,
      })
    );
  }

  onSubmit() {
    const buttons: any = [
      {
        text: "Aceptar",
        handler: () => {
          this.registerNewProcess();
        },
      },
    ];
    this.alert.showAlert(
      "Informacion",
      "Los campos inhabilitados, deberán igual ser llenados al salir la carne del descongelamiento",
      buttons
    );
  }

  onSubmitDefrost() {
    console.log(this.form.value);
    const { hourExit, dateFinal } = this.form.value;
    const payload = {
      defrost: {
        hourExit,
        dateFin: moment(dateFinal).format("YYYY-MM-DD"),
      },
      processId: this.process.processId,
    };
    this.defrost.emit(payload);
  }

  private registerNewProcess() {
    const { lotId, dateIni, hourEntrance, ...value } = this.form.value;
    const payload = {
      lote: {
        loteId: lotId.lotId,
        outputId: lotId.outputId,
      },
      dateIni: moment(dateIni).format("YYYY-MM-DD"),
      hourEntrance: moment(hourEntrance).format("HH:mm"),
      ...value,
    };

    this.submit.emit(payload);
  }

  private updateForm() {
    const {
      productName,
      weigth,
      entrance_hour,
      output_hour,
      start_date,
      end_date,
      ...values
    } = this.process;

    this.form.patchValue({
      productId: productName,
      weight: weigth,
      hourEntrance: entrance_hour,
      hourExit: output_hour,
      dateIni: start_date,
      dateFinal: end_date,
      ...values,
    });
  }

  get dateFinal() {
    return this.form.get("dateFinal");
  }

  get hourExit() {
    return this.form.get("hourExit");
  }

  get dateIni() {
    return new Date(this.form.get("dateIni").value).toISOString();
  }

  get productId() {
    return this.form.get("productId");
  }
  get lotId() {
    return this.form.get("lotId");
  }

  get weight() {
    return this.form.get("weight");
  }

  get dataDefrost() {
    return this.dateFinal.value === "" || this.hourExit.value === "";
  }
  get existDataDefrost() {
    return (
      this.form.get("dateFinal").value !== "" &&
      this.form.get("hourExit").value !== ""
    );
  }
}

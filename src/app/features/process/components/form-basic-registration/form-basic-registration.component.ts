import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import { LotMeatOutput } from "src/app/shared/models/Lot-meat-output.interface";
import { NewProcess } from "src/app/shared/models/new-process.interface";
import { Observable } from "rxjs";
import {
  SELECT_RECENT_RECORDS_PROCESS_SELECTED,
  SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS,
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
  SELECT_RECENT_RECORDS_PROCESS_SUCCESS,
} from "../../store/recent-records/recent-records.selector";
import { Process } from "src/app/shared/models/process.interface";
import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";
import { basicRegisterSelectMaterial } from "../../store/basic-register/basic-register.actions";
import {
  SELECT_BASIC_REGISTER_LOTS,
  SELECT_BASIC_REGISTER_RESULT,
} from "../../store/basic-register/basic-register.select";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";
import { recentRecordsCreateNewProcess } from "../../store/recent-records/recent-records.actions";
import { RawMaterial } from "src/app/shared/models/raw-material.interface";
import { SELECT_PROCESS_DETAIL_SECTION } from "../../store/process-detail/process-detail.selector";

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

  emptyProcess = false;

  datesRegistered = false;

  process: Process;

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  result: boolean;

  onBack = false;

  isNewRegister: boolean;

  section: string;

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
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SELECTED)
      .subscribe((tempProcess) => {
        if (tempProcess != null) {
          this.process = tempProcess;
          this.datesRegistered =
            this.process.end_date !== "" && this.process.output_hour !== "";
          this.updateForm();
          this.emptyProcess = false;
        } else {
          this.emptyProcess = true;
        }
      });
    this.store
      .select(SELECT_BASIC_REGISTER_LOTS)
      .subscribe((lots) => (this.lots = lots));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
      .subscribe((selected) => (this.isSelected = selected));
    this.store
      .select(SELECT_BASIC_REGISTER_RESULT)
      .subscribe((tempResult) => (this.result = tempResult));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER)
      .subscribe((isNew) => (this.isNewRegister = isNew));
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SUCCESS)
      .subscribe((success) => {
        if (success && this.section === "DESCONGELAMIENTO") {
          this.registerNewProcess();
        }
      });
    this.store
      .select(SELECT_PROCESS_DETAIL_SECTION)
      .subscribe((section) => (this.section = section.section));
  }

  selectMaterial() {
    if (!this.onBack) {
      this.lotId.setValue("");
      this.store.dispatch(
        basicRegisterSelectMaterial({
          status: "USED",
          rawMaterialId: this.productId.value.rawMaterialId,
        })
      );
    }
  }

  onSubmit() {
    const buttons: any = [
      {
        text: "Cancelar",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
          this.isNewRegister
            ? this.store.dispatch(recentRecordsCreateNewProcess())
            : this.registerNewProcess();
        },
      },
    ];
    this.alert.showAlert(
      "Informacion",
      `${
        this.isNewRegister
          ? "Para registrar esta sección se creará un nuevo proceso"
          : ""
      }`,
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
    const {
      lotId,
      dateIni,
      hourEntrance,
      productId,
      weight,
      temperature,
      ...value
    } = this.form.value;
    const payload = {
      productId: productId.rawMaterialId,
      lote: {
        loteId: lotId.lotId,
        outputId: lotId.outputId,
      },
      weight,
      temperature,
      dateIni: moment(dateIni).format("YYYY-MM-DD"),
      hourEntrance: moment(hourEntrance).format("HH:mm"),
      processId: localStorage.getItem("processId"),
      productName: productId.rawMaterial,
      lote_interno: lotId.lotId,
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

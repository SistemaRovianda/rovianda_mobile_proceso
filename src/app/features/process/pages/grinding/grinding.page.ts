import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import {
  SELECT_GRINDING_RESULT,
  SELECT_GRINDING_IS_SELECTED,
  SELECT_GRINDING_IS_LOADING,
} from "../../store/grinding/grinding.selector";
import { Observable } from "rxjs";
import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";
import {
  SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA,
  //SELECT_PROCESS_DETAIL_MATERIALS,
} from "../../store/process-detail/process-detail.selector";

import { SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS } from "../../store/recent-records/recent-records.selector";

import { setFormulationsByProductRovianda, setGrindingProcessMetadata } from '../../store/grinding/grinding.actions';
import { setFormulationDetails } from '../../store/formulation/formulation.actions';


@Component({
  selector: "app-grinding",
  templateUrl: "./grinding.page.html",
  styleUrls: ["./grinding.page.scss"],
})
export class GrindingPage implements OnInit {
  constructor(
    private alert: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  result: boolean;

  isSelected: boolean;

  loading: boolean;

  

  private insection:boolean=true;

  


  ngOnInit() {
  
  }

  onBackButton(form) {
    const buttons: any = [
      {
        text: "Cancelar",
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
      this.redirectBack();
    } else if (form.valid && !this.result) {
      this.alert.showAlert(
        "Informacion",
        "",
        "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
        buttons
      );
    } else if (form.invalid) {
      form.reset();
      this.redirectBack();
    }
  }

  redirectBack() {
    this.insection=false;
    this.store.dispatch(setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null}}))
    this.store.dispatch(setGrindingProcessMetadata({process:null}));
    this.router.navigate([`/process/process-detail`]);
  }
  reprocessing() {
    this.router.navigate([`/process/reprocessing`]);
  }
}

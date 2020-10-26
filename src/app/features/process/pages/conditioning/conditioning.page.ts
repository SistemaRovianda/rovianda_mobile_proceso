import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";

import { from, Observable } from "rxjs";


import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";


import { setConditioningProcessMetadata, setFormulationsByProductRovianda } from '../../store/conditioning/conditioning.actions';
import { setFormulationDetails } from '../../store/formulation/formulation.actions';

@Component({
  selector: "app-conditioning",
  templateUrl: "./conditioning.page.html",
  styleUrls: ["./conditioning.page.scss"],
})
export class ConditioningPage implements OnInit {
  constructor(
    private alert: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  result: boolean;

  loading: boolean;

  
  // isSelected: boolean;

  // isSelectedProcess: boolean;

  productsRovianda$: Observable<ProductsRovianda[]> = from([[]]);
  // // materials$: Observable<RawMaterial[]> = this.store.select(
  // //   SELECT_PROCESS_DETAIL_MATERIALS
  // // );

  // lotsMeat$: Observable<ProcessLotMeat[]> = this.store.select(
  //   SELECT_PROCESS_DETAIL_LOTS_MEAT
  // );
    isNewRegister:boolean = true;
  ngOnInit() {
   
    // this.store
    //   .select(SELECT_CONDITIONING_RESULT)
    //   .subscribe((tempResult) => (this.result = tempResult));
    // this.store
    //   .select(SELECT_CONDITIONING_IS_LOADING)
    //   .subscribe((loading) => (this.loading = loading));
    /*this.store
      .select(SELECT_CONDITIONING_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
      .subscribe((selected) => (this.isSelectedProcess = selected));*/
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
    if (form.valid ) {//&& this.isSelected
      form.reset();
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
    
    this.store.dispatch(setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null}}))
    this.store.dispatch(setConditioningProcessMetadata({process:null}));
    this.router.navigate([`/process/process-detail`]);
  }
  reprocessing() {
    this.router.navigate([`/process/reprocessing`]);
  }
}

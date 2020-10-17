import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import {
  SELECT_CONDITIONING_RESULT,
  SELECT_CONDITIONING_IS_LOADING,
  SELECT_CONDITIONING_IS_SELECTED,
} from "../../store/conditioning/conditioning.selector";
import { from, Observable } from "rxjs";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";
import {
  SELECT_PROCESS_DETAIL_PRODUCTS,
  //SELECT_PROCESS_DETAIL_MATERIALS,
  SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA,
  SELECT_PROCESS_DETAIL_LOTS_MEAT,
} from "../../store/process-detail/process-detail.selector";
import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";
import { RawMaterial } from "src/app/shared/models/raw-material.interface";
import { SELECT_RECENT_RECORDS_IS_NEW_REGISTER, SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS } from "../../store/recent-records/recent-records.selector";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
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
    this.store.select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER).subscribe((isNewRegister)=>{
      if(!isNewRegister){
        this.isNewRegister = isNewRegister;
        this.productsRovianda$=from([[{code:"12",name: "asd",id:1,status:true}]]);
      }else{
        this.productsRovianda$=this.store.select( // en caso de no existir se asigna al arreglo varios productos de rovianda para su registro
          SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA
        );
      }
    });
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
          this.store.dispatch(setFormulationDetails({formulation:null}))
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
    this.router.navigate([`/process/process-detail`]);
  }
  reprocessing() {
    this.router.navigate([`/process/reprocessing`]);
  }
}

import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { SELECT_RECENT_RECORDS_IS_NEW_REGISTER } from "../../store/recent-records/recent-records.selector";
import {  setSausageProcessMetadata } from '../../store/sausage/sausage.actions';
import { setFormulationDetails } from '../../store/formulation/formulation.actions';

@Component({
  selector: "app-sausage",
  templateUrl: "./sausage.page.html",
  styleUrls: ["./sausage.page.scss"],
})
export class SausagePage implements OnInit {
  

  constructor(
    private alert: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER).subscribe((isNewRegister)=>{
      this.isNewRegister=isNewRegister;
    });
  }

  isNewRegister:boolean;
  
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
          form.form.reset();
          
          this.redirectBack();
        },
      },
    ];
    
    if ((!form.fieldsRequireds && this.isNewRegister) || !this.isNewRegister) {
      form.form.reset();
      this.redirectBack();
    } else if (form.fieldsRequireds && this.isNewRegister) {
      this.alert.showAlert(
        "Informacion",
        "",
        "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
        buttons
      );
    }
  }

  redirectBack() {
    this.store.dispatch(setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null,reprocesings:[]}}))
    this.store.dispatch(setSausageProcessMetadata({process:null}));
    this.router.navigate([`/process/process-detail`]);
  }
  reprocessing() {
    this.router.navigate([`/process/reprocessing`]);
  }

  subProduct() {
    this.router.navigate([`/process/sub-product`]);
  }
}

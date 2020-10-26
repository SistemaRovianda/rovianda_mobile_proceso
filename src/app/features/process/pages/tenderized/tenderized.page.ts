import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import {  setTenderizedProcessMetadata } from '../../store/tenderized/tenderized.actions';
import { setFormulationDetails } from '../../store/formulation/formulation.actions';

@Component({
  selector: "app-tenderized",
  templateUrl: "./tenderized.page.html",
  styleUrls: ["./tenderized.page.scss"],
})
export class TenderizedPage implements OnInit {
  
  constructor(
    private alert: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  result: boolean;

  loading: boolean;

  isSelected: boolean;

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
      this.redirectBack();
    }
  }

  redirectBack() {
    this.insection=false;
    this.store.dispatch(setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null}}))
    this.store.dispatch(setTenderizedProcessMetadata({process:null}));
    this.router.navigate([`/process/process-detail`]);
  }
  reprocessing() {
    this.router.navigate([`/process/reprocessing`]);
  }
}

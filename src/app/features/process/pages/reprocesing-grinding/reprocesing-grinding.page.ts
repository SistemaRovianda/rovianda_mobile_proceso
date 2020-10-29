import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/store.state.interface';
import { setFormulationDetails } from '../../store/formulation/formulation.actions';
import { setGrindingProcessMetadata } from '../../store/grinding/grinding.actions';

@Component({
  selector: 'app-reprocesing-grinding',
  templateUrl: './reprocesing-grinding.page.html',
  styleUrls: ['./reprocesing-grinding.page.scss'],
})
export class ReprocesingGrindingPage implements OnInit {

  constructor(private router:Router,private store:Store<AppState>) { }

  ngOnInit() {
  }

  onBackButton(){
    this.store.dispatch(setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null,reprocesings:[]}}))
    this.store.dispatch(setGrindingProcessMetadata({process:null}));
    this.router.navigate([`/process/grinding`]);
  }

}

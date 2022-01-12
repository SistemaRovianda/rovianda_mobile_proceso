import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProcessSubProductItem } from 'src/app/shared/models/sub.product.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProcessSubProductService } from 'src/app/shared/services/process-subproduct.service';
import { FormAddSubProductComponent } from '../../components/form-add-sub-product/form-add-sub-product.component';
import { ModalSubProductComponent } from '../../components/modal-sub-product/modal-sub-product.component';

@Component({
  selector: 'app-sub-product',
  templateUrl: './sub-product.component.html',
  styleUrls: ['./sub-product.component.scss'],
})
export class SubProductComponent implements OnInit {

  constructor(private processSubProductService:ProcessSubProductService,private alert: AlertService,
    private router:Router) { }

  @ViewChild("Form",{static:true}) form:FormAddSubProductComponent;

  items:ProcessSubProductItem[]=[];
 
  processId:number;
  ngOnInit() {
    this.processId = +localStorage.getItem("processId");
    this.searchSubProducts();
  }

  searchSubProducts(){
    this.processSubProductService.getAllSubProductsOfProcess(this.processId).subscribe((response)=>{
      this.items = response;
    },err=>{
      this.items=[];
    });
  }

  reloadList(reload:boolean){
    if(reload){
      this.searchSubProducts();
    }
  }
  newRegister(event:any){
    if(event==true){
      this.searchSubProducts();
    }
  }



  onBackButton() {
    if(!this.form.isLoading){
      const buttons: any = [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Aceptar",
          handler: () => {
            this.form.kgNumber=null;
            this.form.newRegister=null;
            this.form.observations=null;
            this.redirectBack();
          },
        },
      ];
      
      if (!this.form.anyFieldFill()) {
            this.redirectBack();
      } else{
        this.alert.showAlert(
          "Informacion",
          "",
          "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
          buttons
        );
      }
    }else{
      this.alert.showAlert('Información',
      '',
      "Aún no se termina de registrar la partida, por favor espere.",
      [{text:"Aceptar"}] as any);
    }
  }

  redirectBack(){
    this.router.navigateByUrl("/process/sausage");
  }

}

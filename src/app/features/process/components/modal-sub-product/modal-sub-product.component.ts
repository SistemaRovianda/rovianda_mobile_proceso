import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ModalController, NavParams } from '@ionic/angular';
import { ProcessSubProductItem } from 'src/app/shared/models/sub.product.interface';
import { ProcessSubProductService } from 'src/app/shared/services/process-subproduct.service';

@Component({
  selector: 'app-modal-sub-product',
  templateUrl: './modal-sub-product.component.html',
  styleUrls: ['./modal-sub-product.component.scss'],
})
export class ModalSubProductComponent implements OnInit {

  processSubProductItem:ProcessSubProductItem;
  isLoading:boolean=false;
  constructor(params:NavParams, public viewC:ModalController,private roviandaApi:ProcessSubProductService) { 
    console.log(params.get('item'));
    this.processSubProductItem=params.get('item');
  }
  
  ngOnInit() {}
  delete(item:ProcessSubProductItem){
    if(!this.isLoading){
      const alert = document.createElement('ion-alert');
      alert.header='Confirmación';
      alert.message="¿Está seguro que desea eliminar el registro?";
      alert.buttons =[
        {
          text: 'Cancelar',
        },
        {text:'Eliminar',
        handler: ()=>{
            this.sendDeleteRequest(item.id);
        }
        }
      ];
      document.body.appendChild(alert);
      return alert.present();
    }
  }

  sendDeleteRequest(id:number){
    console.log("Eliminado");
    this.isLoading=true;
    this.roviandaApi.deleteSubProductOfprocess(id).subscribe(()=>{
      this.isLoading=false;
      this.viewC.dismiss(true);
    },(err)=>{
      this.isLoading=false;
      this.viewC.dismiss(false);
    });
  }

  dateParseStr(date:string,hint:string){
    let dateSplited = date.split(hint);
    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
  }
}

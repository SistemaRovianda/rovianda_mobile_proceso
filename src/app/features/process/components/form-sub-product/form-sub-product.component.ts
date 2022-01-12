import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProcessSubProductItem } from 'src/app/shared/models/sub.product.interface';
import { ModalSubProductComponent } from '../modal-sub-product/modal-sub-product.component';

@Component({
  selector: 'app-form-sub-product',
  templateUrl: './form-sub-product.component.html',
  styleUrls: ['./form-sub-product.component.scss'],
})
export class FormSubProductComponent implements OnInit {

  constructor(public modalCtrl:ModalController) { }
  subProducts:ProcessSubProductItem[]=[
  ];

  @Input() set _items(items:ProcessSubProductItem[]){
    this.subProducts=items;
  }

  ngOnInit() {}

  @Output() deleteSubProduct: EventEmitter<boolean> = new EventEmitter();

  async showDetails(item:ProcessSubProductItem){
   let modalDetails= await this.modalCtrl.create({
     component: ModalSubProductComponent,
     componentProps:{
       item
     }
   });
   modalDetails.present();
   modalDetails.onDidDismiss().then((val)=>{
     console.log("Value to dismiss: "+JSON.stringify(val));
     this.deleteSubProduct.emit(val.data);
   }).catch((val)=>{
    console.log("Value to dismiss: "+JSON.stringify(val));
     this.deleteSubProduct.emit(val.data);
   })
  }
}

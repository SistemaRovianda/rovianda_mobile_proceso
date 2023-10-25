import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ProductQualityCatalog } from 'src/app/shared/models/product-catalog.interface';
import { ProcessSubProductService } from 'src/app/shared/services/process-subproduct.service';

@Component({
  selector: 'app-form-add-sub-product',
  templateUrl: './form-add-sub-product.component.html',
  styleUrls: ['./form-add-sub-product.component.scss'],
})
export class FormAddSubProductComponent implements OnInit {
  products:ProductQualityCatalog[]=[];
  constructor(private roviandaApi:ProcessSubProductService) { }

  product:ProductQualityCatalog;
  kgNumber:number;
  observations:string;
  ngOnInit() {
    this.searchSubProduct();
  }

  @Output("newRegister") newRegister:EventEmitter<boolean> = new EventEmitter();

  searchSubProduct(){
    this.roviandaApi.getAllProductsCatalog().subscribe((products)=>{
      this.products = products.sort((a,b)=>a.name.localeCompare(b.name));
    },err=>{
      this.products=[];
    })
  }
  isLoading:boolean=false;

  register(){
    if(this.product!=null && this.kgNumber!=null && this.kgNumber>0 && this.observations!="" && !this.isLoading){
      this.isLoading=true;
      let processId= +localStorage.getItem("processId");
      let userId=localStorage.getItem("userId");
      
        this.roviandaApi.registerNewSubProduct(processId,this.product.id,this.kgNumber,this.observations,userId).subscribe(()=>{
          this.newRegister.emit(true);
          this.product=null;
          this.observations=null;
          this.kgNumber=null;
          this.isLoading=false;
        },()=>{
          this.newRegister.emit(false);
          this.isLoading=false;
        });
    }
  }

  anyFieldFill(){
    return this.product!=null || this.observations!=null || this.kgNumber!=null;
  }

}

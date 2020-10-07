import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormulationDetails } from 'src/app/shared/models/formulations.interface';

@Component({
  selector: 'app-modal-formulation-details',
  templateUrl: './modal-formulation-details.component.html',
  styleUrls: ['./modal-formulation-details.component.scss'],
})
export class ModalFormulationDetailsComponent implements OnInit {
  lots:any=[];
  constructor(public dialogRef: MatDialogRef<ModalFormulationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormulationDetails) { }

  ngOnInit() {
    this.lots = this.data.defrosts;
    console.log(this.data);
  }
  closeModal(){
    this.dialogRef.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/store.state.interface';
import { SELECT_SAUSAGE_RESULT } from '../../store/sausage/sausage.selector';

@Component({
  selector: 'app-sausage',
  templateUrl: './sausage.page.html',
  styleUrls: ['./sausage.page.scss'],
})
export class SausagePage implements OnInit {

  constructor(
    private alert: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  result: boolean;

  ngOnInit() {
    this.store
    .select(SELECT_SAUSAGE_RESULT)
    .subscribe((tempResult) => (this.result = tempResult));
  }
  onBackButton(form) {
    const buttons: any = [
      {
        text: "Cancel",
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
    if (form.valid) {
      this.alert.showAlert(
        "Informacion",
        "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
        buttons
      );
    } else if (form.invalid) {
      this.redirectBack();
    }
  }

  onNextButton(form) {
    if (form.valid && !this.result) {
      this.alert.showAlert(
        "Informacion",
        "Primero se tiene que guardar la información ingresada",
        ["Aceptar"]
      );
    } else if (this.result || form.invalid) {
      this.redirectNext();
    }
  }

  redirectBack() {
    this.router.navigate([`/process/process-detail`]);
  }

  redirectNext() {
    this.router.navigate([`/process/users`]);
  }

}

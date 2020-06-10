import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export class AlertService {
  constructor(private alertCtrl: AlertController) {}

  async showAlert(title = "Titulo", message = "", buttonObj = ["Aceptar"]) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: buttonObj,
    });

    await alert.present();
  }
}

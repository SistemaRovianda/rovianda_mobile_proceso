import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export class AlertService {
  constructor(private alertCtrl: AlertController) {}

  async showAlert(
    title = "Titulo",
    subtittle = "",
    message = "",
    buttonObj = ["Aceptar"]
  ) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtittle,
      message,
      buttons: buttonObj,
    });

    await alert.present();
  }
}

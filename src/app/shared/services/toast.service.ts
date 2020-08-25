import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ToastService {
  constructor(private toastCtrl: ToastController, private router: Router) {}

  async presentToastSuccess() {
    const toast = await this.toastCtrl.create({
      message: "Operacion exitosa!",
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastCtrl.create({
      message: "Error en la operación!",
      duration: 2000,
      color: "danger",
    });
    toast.present();
  }

  async presentToastMessageWarning(message: string) {
    const toast = await this.toastCtrl.create({
      message: `${message}`,
      duration: 2000,
      color: "warning",
    });
    toast.present();
  }

  async presentToastSuccessCustom(message: string) {
    const toast = await this.toastCtrl.create({
      message: `${message}`,
      duration: 2000,
      color: "success",
    });
    toast.present();
  }
}

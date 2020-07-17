import { Injectable, Inject } from "@angular/core";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import {
  FileTransfer,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";

@Injectable({
  providedIn: "root",
})
export class ProcessReportService {
  url: string;

  fileTransfer: FileTransferObject;
  constructor(
    private http: HttpClient,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File,
    private toastCtrl: ToastController,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  getReport(idProcces: string) {
    console.log("pdfService... " + idProcces);
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
      .download(
        `${this.url}/report/process/${idProcces}`,
        this.file.dataDirectory + idProcces + ".pdf"
      )
      .then((entry) => {
        console.log("entry PDF: ", entry.toURL());
        this.fileOpener
          .open(entry.toURL(), "application/pdf")
          .then(() => {
            this.toastSuccessDownload();
            console.log("File is opened");
          })
          .catch((error) => console.log("Error opening file", error));
      });
  }

  async toastSuccessDownload() {
    const toast = await this.toastCtrl.create({
      message: "Se decargo con exito",
      duration: 2000,
      color: "success",
    });
    // this.router.navigate(["/dried/menu"]);
    toast.present();
  }
}

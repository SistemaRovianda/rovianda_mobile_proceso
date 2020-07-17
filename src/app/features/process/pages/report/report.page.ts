import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProcessReportService } from "src/app/shared/services/process-report.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"],
})
export class ReportPage implements OnInit {
  idProccess: string;
  constructor(
    private router: Router,
    private proccessReport: ProcessReportService
  ) {
    this.idProccess = localStorage.getItem("processId");
  }

  ngOnInit() {}

  downloadReport() {
    this.proccessReport.getReport(this.idProccess);
  }

  onBackButton() {
    this.router.navigate(["/process/recent-records"]);
  }
}

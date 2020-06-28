import { Component, OnInit } from "@angular/core";
import { MenuButton } from "src/app/shared/models/menu-button.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-process-detail",
  templateUrl: "./process-detail.page.html",
  styleUrls: ["./process-detail.page.scss"],
})
export class ProcessDetailPage implements OnInit {
  options: MenuButton[];
  constructor(private router: Router) {
    this.options = [
      {
        name: "Datos de \n registro básico",
        path: "/process/basic-registration",
      },
      {
        name: "Molienda",
        path: "/process/grinding",
      },
      {
        name: "Inyección/tenderizado",
        path: "/process/tenderized",
      },
      {
        name: "Acondicionamiento",
        path: "/process/conditioning",
      },
      {
        name: "Embutido",
        path: "/process/sausage",
      },
      {
        name: "Usuarios",
        path: "/process/users",
      },
    ];
  }

  ngOnInit() {}

  onBackButton() {
    this.router.navigate([`/process/recent-records`]);
  }
}

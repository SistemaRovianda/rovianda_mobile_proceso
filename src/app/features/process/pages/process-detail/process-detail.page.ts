import { Component, OnInit } from "@angular/core";
import { MenuButton } from "src/app/shared/models/menu-button.interface";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { SELECT_PROCESS_DETAIL_IS_LOADING } from "../../store/process-detail/process-detail.selector";
import { processDetailStartCloseProcess } from "../../store/process-detail/process-detail.actions";

@Component({
  selector: "app-process-detail",
  templateUrl: "./process-detail.page.html",
  styleUrls: ["./process-detail.page.scss"],
})
export class ProcessDetailPage implements OnInit {
  options: MenuButton[];

  loading: boolean;
  constructor(private router: Router, private store: Store<AppState>) {
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

  ngOnInit() {
    this.store
      .select(SELECT_PROCESS_DETAIL_IS_LOADING)
      .subscribe((loading) => (this.loading = loading));
  }

  onBackButton() {
    this.router.navigate([`/process/recent-records`]);
  }

  closeProccess() {
    this.store.dispatch(processDetailStartCloseProcess());
  }
}

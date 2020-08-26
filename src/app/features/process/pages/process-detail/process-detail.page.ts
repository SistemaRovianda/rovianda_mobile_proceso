import { Component, OnInit } from "@angular/core";
import { MenuButton } from "src/app/shared/models/menu-button.interface";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { SELECT_PROCESS_DETAIL_IS_LOADING } from "../../store/process-detail/process-detail.selector";
import { processDetailStartCloseProcess } from "../../store/process-detail/process-detail.actions";
import { SELECT_RECENT_RECORDS_IS_NEW_REGISTER } from "../../store/recent-records/recent-records.selector";

@Component({
  selector: "app-process-detail",
  templateUrl: "./process-detail.page.html",
  styleUrls: ["./process-detail.page.scss"],
})
export class ProcessDetailPage implements OnInit {
  options: MenuButton[];

  isNewRegister: boolean;

  loading: boolean;
  constructor(private router: Router, private store: Store<AppState>) {
    this.options = [
      {
        name: "Descongelamiento",
        path: "/process/basic-registration",
        section: "DESCONGELAMIENTO",
      },
      {
        name: "Acondicionamiento",
        path: "/process/conditioning",
        section: "ACONDICIONAMIENTO",
      },
      {
        name: "Molienda",
        path: "/process/grinding",
        section: "MOLIENDA",
      },
      {
        name: "Inyección/tenderizado/inmersión",
        path: "/process/tenderized",
        section: "INJECCIONTENDERIZADO",
      },

      {
        name: "Embutido",
        path: "/process/sausage",
        section: "EMBUTIDO",
      },
    ];
  }

  ngOnInit() {
    this.store
      .select(SELECT_PROCESS_DETAIL_IS_LOADING)
      .subscribe((loading) => (this.loading = loading));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER)
      .subscribe((isNew) => {
        this.isNewRegister = isNew;
        if (!isNew) {
          this.options.push({
            name: "Usuarios",
            path: "/process/users",
            section: "users",
          });
        }
      });
  }

  onBackButton() {
    this.router.navigate([`/process/recent-records`]);
  }

  closeProccess() {
    this.store.dispatch(processDetailStartCloseProcess());
  }
}

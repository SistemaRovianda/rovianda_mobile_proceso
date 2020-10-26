import { Component, OnInit } from "@angular/core";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { MenuButton } from "src/app/shared/models/menu-button.interface";
import { SELECT_PROCESS_DETAIL_SECTION } from "../../store/process-detail/process-detail.selector";
import { Router } from "@angular/router";



@Component({
  selector: "app-reprocessing",
  templateUrl: "./reprocessing.page.html",
  styleUrls: ["./reprocessing.page.scss"],
})
export class ReprocessingPage implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) {}


  ngOnInit() {
  
  }
  onSubmit(form) {
    console.log(form);
  }

  onBackButton() {
    this.router.navigateByUrl("/process/sausage");
  }
}

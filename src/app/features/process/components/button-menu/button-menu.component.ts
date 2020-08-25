import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MenuButton } from "src/app/shared/models/menu-button.interface";
import { Router } from "@angular/router";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { processDetailLoadSection } from "../../store/process-detail/process-detail.actions";

@Component({
  selector: "app-button-menu",
  templateUrl: "./button-menu.component.html",
  styleUrls: ["./button-menu.component.scss"],
})
export class ButtonMenuComponent implements OnInit {
  @Input() menuOption: MenuButton;
  @Output("onClick") submit = new EventEmitter();

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {}

  onClick() {
    this.router.navigate([`${this.menuOption.path}`]);
    this.store.dispatch(processDetailLoadSection({ section: this.menuOption }));
  }
}

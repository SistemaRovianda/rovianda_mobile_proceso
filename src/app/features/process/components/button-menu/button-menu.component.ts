import { Component, OnInit, Input } from "@angular/core";
import { MenuButton } from "src/app/shared/models/menu-button.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-button-menu",
  templateUrl: "./button-menu.component.html",
  styleUrls: ["./button-menu.component.scss"],
})
export class ButtonMenuComponent implements OnInit {
  @Input() menuOption: MenuButton;
  constructor(private router: Router) {}

  ngOnInit() {}

  onClick() {
    this.router.navigate([`${this.menuOption.path}`]);
  }
}

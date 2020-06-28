import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-title-header",
  templateUrl: "./title-header.component.html",
  styleUrls: ["./title-header.component.scss"],
})
export class TitleHeaderComponent implements OnInit {
  @Input() titlePath: string;
  @Input() path: string;

  @Output() OnClickEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit() {}

  onClick(message: string) {
    this.OnClickEvent.emit(message);
  }
}

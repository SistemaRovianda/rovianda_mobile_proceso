import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-title-header",
  templateUrl: "./title-header.component.html",
  styleUrls: ["./title-header.component.scss"],
})
export class TitleHeaderComponent implements OnInit {
  @Input() titlePath: string;
  @Input() path: string;

  @Output() OnClickEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onClick(message: string) {
    this.OnClickEvent.emit(message);
  }
}

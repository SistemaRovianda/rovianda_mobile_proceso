import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-title-header",
  templateUrl: "./title-header.component.html",
  styleUrls: ["./title-header.component.scss"],
})
export class TitleHeaderComponent implements OnInit {
  @Input() titlePath: string;
  @Input() path: string;

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-recent-records",
  templateUrl: "./recent-records.page.html",
  styleUrls: ["./recent-records.page.scss"],
})
export class RecentRecordsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onClick() {
    this.router.navigate(["process/basic-registration"]);
  }
}

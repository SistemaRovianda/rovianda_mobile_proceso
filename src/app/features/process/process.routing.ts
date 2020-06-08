import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecentRecordsPage } from "./pages/recent-records/recent-records.page";
import { RecentRecordsPageModule } from "./pages/recent-records/recent-records.module";
import { RecentRecordsResolver } from "src/app/shared/resolvers/recent-records.resolver";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "recent-records",
        component: RecentRecordsPage,
        resolve: {
          recentRecordsRecolve: RecentRecordsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RecentRecordsPageModule],
  exports: [RouterModule],
  providers:[RecentRecordsResolver]
})
export class ProcessRoutingModule {}

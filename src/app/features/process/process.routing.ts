import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecentRecordsPage } from "./pages/recent-records/recent-records.page";
import { RecentRecordsPageModule } from "./pages/recent-records/recent-records.module";
import { RecentRecordsResolver } from "src/app/shared/resolvers/recent-records.resolver";
import { ProcessDetailPage } from "./pages/process-detail/process-detail.page";
import { ProcessDetailPageModule } from "./pages/process-detail/process-detail.module";
import { BasicRegistrationPage } from "./pages/basic-registration/basic-registration.page";
import { BasicRegistrationPageModule } from "./pages/basic-registration/basic-registration.module";
import { ProcessDetailResolver } from "src/app/shared/resolvers/process-detail.resolver";
import { ConditioningPageModule } from "./pages/conditioning/conditioning.module";
import { ConditioningPage } from "./pages/conditioning/conditioning.page";
import { GrindingPage } from "./pages/grinding/grinding.page";
import { GrindingPageModule } from "./pages/grinding/grinding.module";
import { TenderizedPage } from "./pages/tenderized/tenderized.page";
import { TenderizedPageModule } from "./pages/tenderized/tenderized.module";
import { TenderizedResolver } from "src/app/shared/resolvers/tenderized.resolver";

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
      {
        path: "process-detail",
        component: ProcessDetailPage,
        resolve: {
          process_detail: ProcessDetailResolver,
        },
      },
      {
        path: "basic-registration",
        component: BasicRegistrationPage,
      },
      {
        path: "conditioning",
        component: ConditioningPage,
      },
      {
        path: "grinding",
        component: GrindingPage,
      },
      {
        path: "tenderized",
        component: TenderizedPage,
        resolve: {
          tenderized: TenderizedResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RecentRecordsPageModule,
    ProcessDetailPageModule,
    BasicRegistrationPageModule,
    ConditioningPageModule,
    GrindingPageModule,
    TenderizedPageModule,
  ],
  exports: [RouterModule],
  providers: [RecentRecordsResolver, ProcessDetailResolver, TenderizedResolver],
})
export class ProcessRoutingModule {}

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
import { SausagePage } from "./pages/sausage/sausage.page";
import { SausagePageModule } from "./pages/sausage/sausage.module";
import { UserPage } from "./pages/user/user.page";
import { UserPageModule } from "./pages/user/user.module";
import { SausageResolver } from "src/app/shared/resolvers/sausage.resolver";
import { ConditioningResolver } from "src/app/shared/resolvers/conditioning.resolver";
import { GrindingResolver } from "src/app/shared/resolvers/grinding.resolver";
import { TenderizedResolver } from "src/app/shared/resolvers/tenderized.resolver";
import { BasicRegisterResolver } from "src/app/shared/resolvers/basic-register.resolver";
import { UserResolver } from "src/app/shared/resolvers/users.resolver";
import { ReportPage } from "./pages/report/report.page";
import { ReportPageModule } from "./pages/report/report.module";
import { ReprocessingPage } from "./pages/reprocessing/reprocessing.page";
import { ReprocessingPageModule } from "./pages/reprocessing/reprocessing.module";
import { ReprocessingResolver } from "src/app/shared/resolvers/reprocessing.resolver";
import { ReprocesingGrindingPage } from './pages/reprocesing-grinding/reprocesing-grinding.page';
import { ReprocesingGrindingPageModule } from './pages/reprocesing-grinding/reprocesing-grinding.module';

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
        resolve: {
          basicRegister: BasicRegisterResolver,
        },
      },
      {
        path: "conditioning",
        component: ConditioningPage,
        resolve: {
          conditioning: ConditioningResolver,
        },
      },
      {
        path: "grinding",
        component: GrindingPage,
        resolve: {
          grinding: GrindingResolver,
        },
      },
      {
        path: "tenderized",
        component: TenderizedPage,
        resolve: {
          tenderized: TenderizedResolver,
        },
      },
      {
        path: "sausage",
        component: SausagePage,
        resolve: {
          sausage: SausageResolver,
        },
      },
      {
        path: "users",
        component: UserPage,
        resolve: {
          user: UserResolver,
        },
      },
      {
        path: "report",
        component: ReportPage,
      },
      {
        path: "reprocessing",
        component: ReprocessingPage,
        resolve: {
          reprocessing: ReprocessingResolver,
        },
      },
      {
        path: "reprocesing-grinding",
        component: ReprocesingGrindingPage
      }
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
    SausagePageModule,
    UserPageModule,
    ReportPageModule,
    ReprocessingPageModule,
    ReprocesingGrindingPageModule
  ],
  exports: [RouterModule],
  providers: [
    RecentRecordsResolver,
    ProcessDetailResolver,
    ConditioningResolver,
    GrindingResolver,
    TenderizedResolver,
    SausageResolver,
    BasicRegisterResolver,
    UserResolver,
    ReprocessingResolver,
  ],
})
export class ProcessRoutingModule {}

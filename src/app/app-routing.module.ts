import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { IsAuthGuard } from "./shared/guards/isAuth.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [IsAuthGuard],
    loadChildren: () =>
      import("./features/landing/layout/layout.module").then(
        (m) => m.LayoutModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

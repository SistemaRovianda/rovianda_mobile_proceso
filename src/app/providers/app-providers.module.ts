import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthorizationTokenInterceptor } from "./interceptor";
import { API_ENDPOINT_PROVIDER, API_ENDPOINT_PROVIDER_MOCKUP } from "./tokens";
import { environment } from "src/environments/environment";

@NgModule({
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationTokenInterceptor,
      multi: true,
    },
    {
      provide: API_ENDPOINT_PROVIDER,
      useValue: environment.basePath,
    },
    {
      provide: API_ENDPOINT_PROVIDER_MOCKUP,
      useValue: environment.basePathMock,
    },
  ],
})
export class AppProvidersModule {}

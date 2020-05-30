import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./shared/store/reducers/index.reducer";
import { effects } from "./shared/store/effects/index.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { HttpClientModule } from "@angular/common/http";
import { AppProvidersModule } from "./providers/app-providers.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
    }),
    HttpClientModule,
    AppProvidersModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppProvidersModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

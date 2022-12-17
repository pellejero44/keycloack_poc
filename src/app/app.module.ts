import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { Browser } from '@capacitor/browser';
// import { App } from '@capacitor/app';
// import { Plugins } from '@capacitor/core';

// import * as Keycloak from 'keycloak-js';

// function initializeKeycloak() {
//   const keycloakAuth: Keycloak.KeycloakInstance = Keycloak({
//     url: 'http://10.0.2.2:8080/auth',
//     // url: 'http://127.0.0.1:8080/auth',
//     realm: 'my-demo-realm',
//     clientId: 'my-demo-client',
//   });

//   // console.log(window['cordova'].plugins)

//   return () =>
//     keycloakAuth.init({
//       onLoad: 'login-required',
//       adapter: 'capacitor',
//       responseMode: 'query',
//       redirectUri: 'http://localhost:8100',
//       capacitorAppApi: App,
//     });
// }

// function initializeKeycloak(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init({
//       initOptions: {
//         onLoad: 'login-required',
//         responseMode: 'query',
//         redirectUri: 'http://localhost:8100',
//       },
//       config: {
//         url: 'http://10.0.2.2:8080/auth',
//         realm: 'my-demo-realm',
//         clientId: 'my-demo-client',
//       },
//     });
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    KeycloakAngularModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }// ,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

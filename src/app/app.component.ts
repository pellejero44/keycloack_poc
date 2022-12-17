import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import * as Keycloak from '../../src/assets/keycloakCustom/keycloak';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  keycloakAuth: Keycloak.KeycloakInstance = Keycloak({
    url: 'http://10.0.2.2:8080/auth',
    // url: 'http://127.0.0.1:8080/auth',
    realm: 'my-demo-realm',
    clientId: 'my-demo-client',
  });
  authSuccess = false;
  public userProfile = {};

  constructor(private changeRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.keycloakAuth
      .init({
        adapter: 'capacitor-native',
        responseMode: 'query',
        redirectUri: 'poc-keycloack-fremap.com://home',
        // redirectUri: 'http://127.0.0.1:8100/home',
        capacitorAppApi: App,
      })
      .then((res) => console.log('init then', res))
      .catch((res) => console.log('init catch', res));

    this.authSuccess = this.keycloakAuth.authenticated ?? false;

    this.keycloakAuth.onAuthSuccess = () => {
      console.log('onAuthSuccess');
      this.authSuccess = true;
      this.changeRef.detectChanges();
    };

    this.keycloakAuth.onAuthLogout = () => {
      console.log('onAuthLogout');
      this.authSuccess = false;
      this.userProfile = {};
      this.changeRef.detectChanges();
    };
  }

  login(): void {
    console.log('login');
    this.keycloakAuth
      .login()
      .then((res) => {
        console.log('success login', res);
        this.authSuccess = this.keycloakAuth.authenticated ?? false;
      })
      .catch((err) => {
        console.log('error-login', err);
        this.authSuccess = this.keycloakAuth.authenticated ?? false;
      });
  }

  loadProfile(): void {
    this.keycloakAuth.loadUserProfile().then((profile) => {
      this.userProfile = profile;
      this.changeRef.detectChanges();
    });
  }

  logout(): void {
    this.keycloakAuth.logout();
  }
}

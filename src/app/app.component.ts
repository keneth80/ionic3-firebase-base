import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = TabsPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform,
                private afAuth: AngularFireAuth,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'login', component: LoginPage }
        ];
    }

    initializeApp() {
        this.afAuth.authState.subscribe(auth => {
            if (auth) {
                this.rootPage = TabsPage;
                this.pages = [
                  { title: 'Profile', component: ProfilePage }
                ];
            } else {
                this.rootPage = LoginPage;
            }
        });

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}

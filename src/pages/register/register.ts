import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

import { User } from '../models/user';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    user: any = {} as User;
    items: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private loadingCtrl: LoadingController,
        private afAuth: AngularFireAuth,
        private authService: AuthProvider,
        private afDB: AngularFireDatabase) {
        // Firebase database
        this.items = this.afDB.list('/users');
    }

    async signup() {
        let loading = this.loadingCtrl.create({
            content: 'Loading...'
        });
        loading.present();

        try {
            await this.authService.addUser(this.user).then(
                (user: any) => {
                    console.log(user);
                    //DB insert
                    this.items.push(
                        {
                            email: user.email,
                            uid: user.uid
                        }
                    );

                    this.navCtrl.setRoot(ProfilePage);
                    loading.dismiss();
                }, (error) => {
                    loading.dismiss();
                    let errortoast = this.loadingCtrl.create({
                        content: 'Register Error!',
                        duration: 2000
                    });
                    errortoast.present();
                });

        } catch (err) {
            console.error(err);
            loading.dismiss();
        }
    }

    goBack() {
        this.navCtrl.setRoot(LoginPage);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

}

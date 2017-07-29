import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loadingCtrl: LoadingController,
                private afAuth: AngularFireAuth) {
    }

    async register(user: any) {
        let loading = this.loadingCtrl.create({
            content: 'Loading...'
        });
        loading.present();

        try {
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
            result.then((result: any) => {
                //DB insert
                this.navCtrl.setRoot(HomePage);
                loading.dismiss();
            }, (error) => {
                loading.dismiss();
                let errortoast = this.loadingCtrl.create({
                    content: 'Register Error!',
                    duration: 2000
                });
                errortoast.present();
                console.log(result);
            })
            console.log(result);
            
        } catch (err) {
            console.error(err);
            loading.dismiss();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

}

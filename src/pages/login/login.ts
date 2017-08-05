import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

import { User } from '../models/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public userId: string;
  _firstName: String;
  _gender: String;
  _lastName: String;
  _name: String;
  _data: any;
  user: any = {} as User;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthProvider) {
  }

  signin(user: User) {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    this.authService.login(this.user)
      .then(auth => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        loading.dismiss();
        alert(JSON.stringify(err));
      });
  }

  signup() {
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

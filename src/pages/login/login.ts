import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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
  user: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private facebook: Facebook) {
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    this.afAuth.auth
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(auth => {
        loading.dismiss();
        // Do custom things with auth
        // alert('Login Success : ' + JSON.stringify(auth));
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        loading.dismiss();
        alert(JSON.stringify(err));
      });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  facebookLogin() {
    this.facebook.login(['public_profile', 'user_friends', 'email', 'user_posts'])
      .then((res: FacebookLoginResponse) => {
        this.userId = res.authResponse.userID
        this.getUserInformation();
        // this.getUserFeeds();
        this.navCtrl.push('MyprofilePage', {
          firstName: this._firstName,
          lastName: this._lastName,
          name: this._name,
          gender: this._gender,
          data: this._data
        })

      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserInformation() {
    this.facebook.getLoginStatus().then((response) => {
      if (response.status == 'connected') {
        this.facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,first_name,last_name', []).then((response) => {
          this._name = JSON.parse(JSON.stringify(response)).name;
          this._gender = JSON.parse(JSON.stringify(response)).gender;
          this._firstName = JSON.parse(JSON.stringify(response)).id;
          this._lastName = JSON.parse(JSON.stringify(response)).last_name;

          this.getUserFeeds();
        }, (error) => {
          alert(error);
        })
      }
    })
  }

  getUserFeeds() {
    this.facebook.getLoginStatus().then((res) => {
      if (res.status == 'connected') {
        this.facebook.api('/me/feed', []).then((res) => {
          this._data = res.data;
          // alert(JSON.stringify(this._data));
        }, (error) => {
          alert(error);
        })
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

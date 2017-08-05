import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { User } from '../../pages/models/user';



@Injectable()
export class AuthProvider {

  constructor(public http: Http,
    public angularFireAuth: AngularFireAuth) {
  }

  login(user: User): firebase.Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  addUser(user): firebase.Promise<any> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginWithFacebook() {

  }

  loginWithGoogle() {

  }

}
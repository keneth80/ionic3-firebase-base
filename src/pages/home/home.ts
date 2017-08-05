import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imgsource: any;
  firestore = firebase.storage().ref();

  constructor(
    private auth: AngularFireAuth,
    public zone: NgZone) {

  }

  signOut() {
    this.auth.auth.signOut();
  }

  display() {
    this.firestore.child('images/profile/1500210446.jpg').getDownloadURL().then((url) => {
      this.zone.run(() => {
        this.imgsource = url;
      })
    })
  }
}

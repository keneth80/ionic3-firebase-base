import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afDB: AngularFireDatabase) {
      this.items = afDB.list('/users');
  }
}

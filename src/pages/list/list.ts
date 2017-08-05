import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: FirebaseListObservable<any>;

  constructor(private afDB: AngularFireDatabase) {
    this.items = afDB.list('/users');
  }
}

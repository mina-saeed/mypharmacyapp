import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TrackOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-track-order',
  templateUrl: 'track-order.html',
})
export class TrackOrderPage {
  orderData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.orderData = this.navParams.data;
      console.log(this.orderData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackOrderPage');
  }

}

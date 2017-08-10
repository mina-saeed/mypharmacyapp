import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';


import * as io from 'socket.io-client';

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

  private translate: TranslateService;


  //this.translate.use('en');

  orderData:any;
  socketHost: string = "http://146.185.148.66:3015";
  socket:any;
  zone:any;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
      this.translate=translate;
      this.orderData = this.navParams.data;
      console.log(this.orderData);


      this.socket = io.connect(this.socketHost);
      this.zone = new NgZone({enableLongStackTrace: false});
      console.log("Before listening to event");

      this.socket.on("pharmacyConfirmed", (data) =>{
        this.zone.run(() =>{
        //  console.log(data);
        //do something
        })
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackOrderPage');
  }

}

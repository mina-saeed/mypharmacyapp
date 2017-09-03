import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

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
  url: string = "http://146.185.148.66:3009/";
  socket:any;
  zone:any;
  currentOrderID:any;

  constructor(public http:Http, translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
      this.translate=translate;
      this.translate.use("en");
      this.orderData = this.navParams.data;
      this.currentOrderID="598694efbb7e505fed75be5";
      console.log(this.orderData);



      this.socket = io.connect(this.socketHost, {'force new connection': true});
      this.zone = new NgZone({enableLongStackTrace: false});
      console.log("Before listening to event");

    //  console.log("socket1: ", this.socket);

      this.socket.on("pharmacyConfirmed", (data) =>{
        console.log("recieved data ", data);
      //  alert(data);

        this.zone.run(() =>{
         console.log("recieved data", data);
        //do something
        })
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackOrderPage');
  }
  goBasket(){
    this.navCtrl.push(BasketPage);
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }
  cancelOrder(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    this.http.delete(this.url + 'cancelOrder/' + this.currentOrderID, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);

    }, err => {
      console.log(err);
    });
  }
}

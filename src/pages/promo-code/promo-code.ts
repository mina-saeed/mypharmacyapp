import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { BasketPage } from '../basket/basket';

/**
 * Generated class for the PromoCodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-promo-code',
  templateUrl: 'promo-code.html',
})
export class PromoCodePage {


    promoValue:any;
    url:string;
    promoInput = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.url = 'http://146.185.148.66:3009/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoCodePage');
  }


  getPromoCode(){
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');



    //depends on message!
    //expired ye3ml 7aga
    //not available ye3ml 7aga
    //available.. push wkda!!

    this.url = "http://146.185.148.66:2300/checkPromotion/" + this.promoInput;

    this.http.get(this.url, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);
    //  this.promoMessage = "Promotion Added!";
      alert("Promotion Added!")
      this.promoInput = "";
      this.promoValue = 20;
      this.navCtrl.push(BasketPage, this.promoValue);

    //  this.navCtrl.push(TrackOrderPage, this.orderData);
    }, err => {
        alert("Invalid Promocode!")
      console.log(err);
    });
  }
}

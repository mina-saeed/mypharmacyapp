import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the BasketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  orderData = {
    userInfo: {
      userID: 4654,
      location : {
        city : "cairo",
        street : "streetvalue",
        location: "zamalek" ,
      }
    },
    order:[

      {id:1, name:"medicine1", qty:3},

      {id:2, name:"medicine2", qty:5},

      {id:3, name:"medicine3", qty:1},

    ]};

  url:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {

    this.url = 'http://146.185.148.66:3000/';
  }

  ionViewDidLoad() {

/*   let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


    this.http.post(this.url + 'order/submit', JSON.stringify(this.orderData), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
    console.log("done");*/
  }

}

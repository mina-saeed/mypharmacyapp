import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {
  userID:any;
  orderHistory = [];
  url:string;

  constructor(public http:Http, public navCtrl: NavController, public navParams: NavParams) {

    this.url = 'http://146.185.148.66:3000/';
    this.userID = 50;
    this.getHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }
  getHistory(){
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    this.http.get(this.url + 'userHistory/' + this.userID, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);

      this.orderHistory = JSON.parse(data["_body"]);
      console.log(this.orderHistory);
    }, err => {
      console.log(err);
    });
    console.log("done");
  }

}

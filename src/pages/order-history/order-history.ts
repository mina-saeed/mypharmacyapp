import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import { DetailedOrderPage } from '../detailed-order/detailed-order';


//import 'rxjs/add/operator/map';

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
  private translate: TranslateService;

  userID:any;
  orderHistory = [];
  url:string;
  order =[];
  //mena =[{1,2,3,4},{1,2,3,4}];

  constructor(translate: TranslateService,public http:Http, public navCtrl: NavController, public navParams: NavParams) {
     this.translate = translate;

    this.url = 'http://146.185.148.66:3000/';
 //   this.userID = 1;
    this.userID = 654564654454;
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

//let list: string[] = [];

/*this.orderHistory.forEach(element => {
    element.forEach(
    list.push(element));
}); */
//console.log(list);
      console.log(this.orderHistory);
    }, err => {
      console.log(err);
    });
    console.log("done");
  }
  goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0});
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }
  goDetailedOrder(){
    this.navCtrl.push(DetailedOrderPage);
  }
goToDetails(){
   this.navCtrl.push(DetailedOrderPage);
}
}

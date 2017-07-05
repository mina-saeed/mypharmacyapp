import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationPage } from '../location/location';
import { OrderPage } from '../order/order';
import { TabsPage } from '../tabs/tabs';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  url:string;
  deviceID:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,
              private uniqueDeviceID: UniqueDeviceID) {
                this.url = 'http://207.154.240.16:3000/';
                this.uniqueDeviceID.get()
              .then((uuid: any) => this.deviceID = uuid)
              .catch((error: any) => console.log(error));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  signIn(){

    //********** CODE SNIPPET, when loading this page check if device id is registered!

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');
    //add more, eli homa device id w kol 7aga
  //  let body = new FormData();
  //  body.append("deviceID", "50");


    let body = {
      deviceID: 5000
    };
    this.http.post(this.url + 'userHome',JSON.stringify(body), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {

    /*  let obj = JSON.parse(JSON.stringify(data));
      if (obj["_body"] == "no data"){
        console.log("no data found, redirecting to register!!!");
        this.navCtrl.push(LocationPage);
      }else{
        console.log("DATA found, redirecting to ORDER!!!");
        this.navCtrl.push(OrderPage);
      }*/

      this.navCtrl.push(TabsPage);

      console.log(data);
      console.log(this.url + 'userHome/50');
    }, err => {
      //no data, go to registeration form!!
      console.log(err);
      this.navCtrl.push(LocationPage); //w wadilo device id as parameter
    });

  //  this.navCtrl.push(LocationPage);
  }
  signInFB(){

    //********** CODE SNIPPET, when loading this page check if device id is registered!

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    this.http.get(this.url + 'login/facebook', new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {



      console.log(data);

    }, err => {
      //no data, go to registeration form!!
      console.log(err);
      console.log("ERRROOOOR");
    });

  //  this.navCtrl.push(LocationPage);
  }

}

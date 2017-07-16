import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginEmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-email',
  templateUrl: 'login-email.html',
})
export class LoginEmailPage {

  url:string;
  userData = {
    //  name: "",
      email: "",
      password: "",
  //    token: "",
    }

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http:Http) {
    this.url = 'http://146.185.148.66:3000/';
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterEmailPage');
  }

  login(){
    console.log("login button");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


    //add more, eli homa device id w kol 7aga
    let body = {
    //  name: this.userData.name,
      email: this.userData.email,
      password: this.userData.password,
      token: "aadsffsfv",
    };



    this.http.post(this.url + 'login', JSON.stringify(body), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {

      console.log(data);
      this.navCtrl.push(TabsPage);

    }, err =>{
      console.log(err);
    });


    //logout get request... /logout
  }
}

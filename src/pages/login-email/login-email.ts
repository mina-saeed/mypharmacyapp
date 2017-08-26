import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { RegisterEmailPage } from '../register-email/register-email';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

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

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,
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


    if(this.userData.email == "" || this.userData.password == "")
    {
      alert("Do not leave any field empty!");
    }else{
      this.http.post(this.url + 'login', JSON.stringify(body), new RequestOptions({headers:headers}))
      .map(res => res).subscribe(data => {

        console.log(data);
        this.nativeStorage.setItem('rememberUser', body)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
        this.navCtrl.push(TabsPage);

      }, err =>{
        console.log(err);
        alert(err["_body"]);
      });
    }



    //logout get request... /logout
  }
  register(){
    this.navCtrl.push(RegisterEmailPage);
  }
}

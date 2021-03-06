import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { RegisterEmailPage } from '../register-email/register-email';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from 'ng2-translate';

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

    private translate: TranslateService;
    currentLanguage: string;
  constructor(translate: TranslateService, private alertCtrl: AlertController,private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,
  public http:Http) {
    this.translate=translate;
  if (this.translate.currentLang =='ar') {
    this.currentLanguage = "ar";
  }
  else {
    this.currentLanguage = "en";
  }
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
    //  token: "aadsffsfv",
    };


    if(this.userData.email == "" || this.userData.password == "")
    {
      if(this.currentLanguage == "en"){
        this.customAlert("Error", "Do not leave any field empty", "Close");
      }else if(this.currentLanguage =="ar"){
       this.customAlert("خطأ", "لا تترك أي مساحة فارغة", "أغلق");
      }
    }else{
      this.http.post(this.url + 'login', JSON.stringify(body), new RequestOptions({headers:headers}))
      .map(res => res).subscribe(data => {
        console.log("login data", data)
        let body = {
          //userID lma mahmoud yeb3tholi 3shan nesta5dmo
          userID: JSON.parse(data["_body"])["userID"],
          name: JSON.parse(data["_body"])["username"],
          email: this.userData.email,
          password: this.userData.password,
        //  token: "aadsffsfv",
        };
        console.log(body.name);
        this.nativeStorage.setItem('rememberUser', body)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
        this.navCtrl.setRoot(TabsPage);

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
  customAlert(title, message, buttonText){
    let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: buttonText,

          }
        ]
      });
      alert.present();
  }
}

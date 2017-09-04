import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform, AlertController} from 'ionic-angular';
import { LocationPage } from '../location/location';
import { TabsPage } from '../tabs/tabs';
import { LoginEmailPage } from '../login-email/login-email';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TestStorageProvider } from '../../app/test-storage';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import {  availableLanguages, sysOptions } from './welcome.constants';
import { NativeStorage } from '@ionic-native/native-storage';
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
  languages = availableLanguages;
    selectedLanguage = sysOptions.systemLanguage;
    //alert(storage.get('language'));
    param = { value: 'world' };
    private translate: TranslateService;
    url:string;
    deviceID:string;
    storage:Storage;

    disableButton:boolean = false;

    constructor(private nativeStorage: NativeStorage,private fb: Facebook, platform: Platform, translate: TranslateService,  public lang: TestStorageProvider,  public navCtrl: NavController, public navParams: NavParams, public http:Http, private uniqueDeviceID: UniqueDeviceID,private iab: InAppBrowser) {
    //alert(translate);
    this.translate= translate;
    //this.translate.use('en');
    //alert(this.lang.load());
    this.apply();
   // this.storage=storage;
   // this.translate.use(this.storage.get('language'));
   // this.translate.use(this.getLanguage());
      console.log("welcooooooome");

     this.url = 'http://146.185.148.66:3000/';
     this.uniqueDeviceID.get()
        .then((uuid: any) => this.deviceID = uuid)
         .catch((error: any) => console.log(error));
     //this.apply();
    }
    apply(){
    //alert(this.lang.load());
    return this.lang.load();
    }

/*
    getSuitableLanguage(language) {
      language = language.substring(0, 2).toLowerCase();
      return availableLanguages.some(x => x.code == language) ? 'ar' : 'ar';
    }
    */
  /*
    constructor(translate: TranslateService, private lang: Language, public navCtrl: NavController, public navParams: NavParams, public http:Http, private uniqueDeviceID: UniqueDeviceID) {
      this.translate = translate;
      this.translate.use(getLanguage());
      //this.url = 'http://207.154.240.16:3000/';
     //this.url = 'http://146.185.148.66:3000/';

     this.uniqueDeviceID.get()
        .then((uuid: any) => this.deviceID = uuid)
         .catch((error: any) => console.log(error));
    }

    applyLanguage() {
      this.translate.use(this.selectedLanguage);
    }
  */



  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
    signIn(){ //guest

      this.disableButton = true;

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
      deviceID: this.deviceID
    };

    console.log(this.deviceID);
//should check internet connection and other errors
//if any error keep in this page and enable button again
//otherwise error of no userId.. go to locationpage aw ayan kan
//try to use async and await for better performance

    this.http.post(this.url + 'userHome',JSON.stringify(body), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {

    /*  let obj = JSON.parse(JSON.stringify(data));
      if (obj["_body"] == "no data"){
        console.log("no data found, redirecting to register!!!");
        if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }
        this.navCtrl.push(LocationPage);
      }else{
        console.log("DATA found, redirecting to ORDER!!!");
        this.navCtrl.push(OrderPage);
      }*/
      if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }

      this.navCtrl.setRoot(TabsPage);
      this.disableButton = false; //raga3ha lel state el tabi3ya 3shan law daas back msln

    //  console.log(data);
      //console.log(this.url + 'userHome/50');
    }, err => {
      //no data, go to registeration form!!
      console.log(err);
      if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }
      this.navCtrl.push(LocationPage, 1); //1 is guest
      this.disableButton = false; //raga3ha lel state el tabi3ya
    });

  //  this.navCtrl.push(LocationPage);
  }
   signInFB(){
    this.disableButton = true;
    //this.fb.logout();
    this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) => {

    console.log('Logged into Facebook!', res);

    //end point, send res data to mahmoud
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


    this.url = 'http://146.185.148.66:3000/fbLogin';
    this.http.post(this.url, res["authResponse"], new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);
    //  console.log(this.subProdcuts);
    }, err => {
      console.log(err);
    });

    this.navCtrl.push(LocationPage);
    this.disableButton = false;
    })
  .catch(e => {console.log('Error logging into Facebook', e);
this.disableButton = false;});
  this.disableButton = false;



  }

  signInEmail(){
    this.disableButton = true;
    this.navCtrl.push(LoginEmailPage);
    this.disableButton = false;
  }

}

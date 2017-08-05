import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { LocationPage } from '../location/location';
import { TabsPage } from '../tabs/tabs';
import { LoginEmailPage } from '../login-email/login-email';

import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TestStorageProvider } from '../../app/test-storage';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import {  availableLanguages, sysOptions } from './welcome.constants';
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

    constructor(platform: Platform, translate: TranslateService,  public lang: TestStorageProvider,  public navCtrl: NavController, public navParams: NavParams, public http:Http, private uniqueDeviceID: UniqueDeviceID,private iab: InAppBrowser) {
    //alert(translate);
    this.translate= translate;
   // this.translate.use(this.apply());
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
      deviceID: this.deviceID
    };
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

      this.navCtrl.push(TabsPage);

      console.log(data);
      console.log(this.url + 'userHome/50');
    }, err => {
      //no data, go to registeration form!!
      console.log(err);
      if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }
      this.navCtrl.push(LocationPage); //w wadilo device id as parameter
    });

  //  this.navCtrl.push(LocationPage);
  }
  async signInFB(){

    let headers = new Headers();

    this.http.get(this.url + 'login/facebook', new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {

      //this is using in app browser tab, we can use push instead
      const browser = this.iab.create(data["url"]);


      browser.show(); //page show kda f sanya w troo7 a7sn mn el flicker
      console.log(data["url"]); //54

      if(data["_body"] == "success")
      {
       browser.close();
       console.log("closed");
       this.navCtrl.push(TabsPage); //parameters should be passed, device id
     }

     console.log(data); //55

     //bugs
    //when first logging in, after succes it requires to manually close the window and press again facebook button!!
     //window open then sigin in normally, could be improved by a timer but NOT ANY IONIC FUNCTION



    }, err => {
      //no data, go to registeration form!!
      console.log(err);
      console.log("ERRROOOOR");
    });

  //  this.navCtrl.push(LocationPage);

     console.log("all login done");
  }

  signInEmail(){
    this.navCtrl.push(LoginEmailPage);
  }

}

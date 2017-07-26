import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, Headers, RequestOptions} from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Events } from 'ionic-angular';

import { LocalStorageService } from 'angular-2-local-storage';
import { HomePage } from '../pages/home/home';
import { LocationPage } from '../pages/location/location';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { BasketPage } from '../pages/basket/basket';
import { LanguagePage } from '../pages/language/language';
import { CameraPage } from '../pages/camera/camera';

import { RegisterEmailPage } from '../pages/register-email/register-email';
import { LoginEmailPage } from '../pages/login-email/login-email';
import { MapTestPage } from '../pages/map-test/map-test';
import { SearchTestPage } from '../pages/search-test/search-test';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 // //change to TabsPage to test anything
    url:string;
    deviceID:string;
    rootPage:any;
    //local: LocalStorageService;
  constructor(platform: Platform,  statusBar: StatusBar, splashScreen: SplashScreen,public http:Http, private uniqueDeviceID: UniqueDeviceID){
    //this.local = =new LocalStorageService();

    //this.local.set('language');
    this.url = 'http://146.185.148.66:3000/';
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    let body = {
      deviceID: 5000
    };
    this.http.post(this.url + 'userHome',JSON.stringify(body), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      //this.navCtrl.push(WelcomePage);
      this.rootPage = WelcomePage;

      console.log(data);
      console.log(this.url + 'userHome/50');
    }, err => {
      //no data, go to registeration form!!
      console.log(err);
      //this.navCtrl.push(LanguagePage);
      this.rootPage = TabsPage; //w wadilo device id as parameter
    });
    });
  }
/*setLanguage(name) {
  this.local.set('language', name);
}

getLanguage() {
  this.local.get("language").then((output) => {
      alert(output);
  })
}
*/

}

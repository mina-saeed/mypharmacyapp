import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, Headers, RequestOptions} from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Platform} from 'ionic-angular';
import {CategoriesPage} from '../pages/categories/categories';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LanguagePage } from '../pages/language/language';




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

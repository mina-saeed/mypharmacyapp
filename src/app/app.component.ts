import { Component } from '@angular/core';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Platform, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

//import {CategoriesPage} from '../pages/categories/categories';
import { TabsPage } from '../pages/tabs/tabs';
import { TestFeaturesPage } from '../pages/test-features/test-features';
import { WelcomePage } from '../pages/welcome/welcome';
import { LanguagePage } from '../pages/language/language';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from 'ng2-translate';
import { DetailedProductPage } from '../pages/detailed-product/detailed-product';
import {SubCategoriesPage} from '../pages/sub-categories/sub-categories';
import { ReceiptPage } from '../pages/receipt/receipt';
import { AddressesPage } from '../pages/addresses/addresses';
import { ReminderPage } from '../pages/reminder/reminder';
import { TrackOrderPage } from '../pages/track-order/track-order';
import { RemindersMedicinesListPage } from '../pages/reminders-medicines-list/reminders-medicines-list';
import { DetailedRemindersMedicinesListPage } from '../pages/detailed-reminders-medicines-list/detailed-reminders-medicines-list';
import { OrderHistoryPage } from '../pages/order-history/order-history';
import { AccountPage } from '../pages/account/account';
import { IllnessPage } from '../pages/illness/illness';
import { PersonReminderPage } from '../pages/person-reminder/person-reminder';

import { RemindmePage } from '../pages/remindme/remindme';

import { LocationPage } from '../pages/location/location';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any;
    language:any;
  constructor(private alertCtrl: AlertController, private network: Network, statusBar: StatusBar,private translate: TranslateService, splashScreen: SplashScreen,private nativeStorage: NativeStorage,platform: Platform){


    this.subscribeNoConnection();
    this.subcribeConnection();

      statusBar.styleDefault();
      splashScreen.hide();
    platform.ready().then(() => {
    this.nativeStorage.getItem('language')
        .then(data =>{

            this.translate = translate;
              translate.use(data);

          this.nativeStorage.getItem('rememberUser')
          .then(
          data => this.rootPage=TabsPage,
          error => this.rootPage=TabsPage
        );

          //this.language = data;
                 } ,
          error => {

          this.rootPage=LanguagePage;


          }
        );

    });
}
  rememberMe(){

  }
  subscribeNoConnection(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    // alert('Network was disconnected!');
    if (this.translate.currentLang =='ar') {
      this.customAlert("شبكة الاتصال","تم قطع الاتصال بالشبكة","أغلق");
    }
    else {
      this.customAlert("Network","Network Disconnected","Close");
    }
//      this.subcribeConnection();
    });
  }
  subcribeConnection(){




    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      if (this.translate.currentLang =='ar') {
        this.customAlert("شبكة الاتصال","الشبكة متصلة","أغلق");
      }
      else {
        this.customAlert("Network","Network Connected","Close");
      }
    //  this.subscribeNoConnection();
    });
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

import { Component } from '@angular/core';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any;
    language:any;
  constructor(statusBar: StatusBar,private translate: TranslateService, splashScreen: SplashScreen,private nativeStorage: NativeStorage,platform: Platform){
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

          this.rootPage=TabsPage;

          }
        );

    });
  }

  rememberMe(){

  }

}

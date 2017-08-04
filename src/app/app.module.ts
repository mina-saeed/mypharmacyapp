import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocationPage } from '../pages/location/location';
import { UpdateLocationPage } from '../pages/update-location/update-location';
import { Http, HttpModule} from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';
//import { NavController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';;
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ImagePicker } from '@ionic-native/image-picker';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer} from '@ionic-native/file-transfer';
import { NativeStorage } from '@ionic-native/native-storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LanguagePage } from '../pages/language/language';
import { CameraPage } from '../pages/camera/camera';
import { WelcomePage } from '../pages/welcome/welcome';
import { BasketPage } from '../pages/basket/basket';
import { RegisterEmailPage } from '../pages/register-email/register-email';
import { LoginEmailPage } from '../pages/login-email/login-email';
import { SearchTestPage } from '../pages/search-test/search-test';
import { LocalStorageModule } from 'angular-2-local-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { DetailedProductPage } from '../pages/detailed-product/detailed-product';
import { TrackOrderPage } from '../pages/track-order/track-order';
//import { Serviceprovider } from '../pages/serviceprovider/serviceprovider';
import { AccountPage } from '../pages/account/account';
import { SettingsPage } from '../pages/settings/settings';
import { MenuPage } from '../pages/menu/menu'
import { CategoriesPage } from '../pages/categories/categories';
import { ReceiptPage } from '../pages/receipt/receipt';

import { TestStorageProvider } from './test-storage';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { WheelSelector } from '@ionic-native/wheel-selector';
import {RoundProgressModule} from 'angular-svg-round-progressbar';


import { Ionic2RatingModule } from 'ionic2-rating';
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
  }
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationPage,
    LanguagePage,
    TabsPage,
    CameraPage,
    UpdateLocationPage,
    WelcomePage,
    BasketPage,
    DetailedProductPage,
    TrackOrderPage,
    RegisterEmailPage,
    SearchTestPage,
    DetailedProductPage,
    SettingsPage,
    MenuPage,
    AccountPage,
    LoginEmailPage,
    CategoriesPage,
    ReceiptPage,
    AccountPage,
    LoginEmailPage
  ],
  imports: [
  LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),RoundProgressModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',

    }
  ), Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LanguagePage,
    LocationPage,
    UpdateLocationPage,
    WelcomePage,
    BasketPage,
    CategoriesPage,
    AccountPage,
    SettingsPage,
    TabsPage
  ],
  

  providers: [
    StatusBar,RemoteServiceProvider,WheelSelector,
    SplashScreen, Camera, BarcodeScanner, Geolocation, FileTransfer,NativeStorage, ImagePicker,InAppBrowser, UniqueDeviceID,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, TestStorageProvider,
    SettingsPage,
    MenuPage,
    AccountPage
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocationPage } from '../pages/location/location';
import { UpdateLocationPage } from '../pages/update-location/update-location';
import { Http, Headers, HttpModule} from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';
//import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';;
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ImagePicker } from '@ionic-native/image-picker';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LanguagePage } from '../pages/language/language';
import { CameraPage } from '../pages/camera/camera';
import { WelcomePage } from '../pages/welcome/welcome';
import { OrderPage } from '../pages/order/order';
import { BasketPage } from '../pages/basket/basket';
import { RegisterEmailPage } from '../pages/register-email/register-email';
import { LoginEmailPage } from '../pages/login-email/login-email';
import { MapTestPage } from '../pages/map-test/map-test';

import { LocalStorageModule } from 'angular-2-local-storage';
import { TestStorageProvider } from './test-storage';
import { Geolocation } from '@ionic-native/geolocation';

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
    OrderPage,
    BasketPage,
    RegisterEmailPage,
    LoginEmailPage,
    MapTestPage
  ],
  imports: [
  LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
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
    LocationPage,
    LanguagePage,
    TabsPage,
    CameraPage,
    UpdateLocationPage,
    WelcomePage,
    OrderPage,
    BasketPage,
    RegisterEmailPage,
    LoginEmailPage,
    MapTestPage
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera, BarcodeScanner, Geolocation, FileTransfer,NativeStorage, ImagePicker,InAppBrowser, UniqueDeviceID,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, TestStorageProvider
  ]
})
export class AppModule {}

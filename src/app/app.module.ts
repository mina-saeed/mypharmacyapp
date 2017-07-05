import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocationPage } from '../pages/location/location';
import { UpdateLocationPage } from '../pages/update-location/update-location';
import { Http, Headers, HttpModule} from '@angular/http';


import { Camera, CameraOptions } from '@ionic-native/camera';;
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ImagePicker } from '@ionic-native/image-picker';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CameraPage } from '../pages/camera/camera';
import { WelcomePage } from '../pages/welcome/welcome';
import { OrderPage } from '../pages/order/order';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationPage,
    TabsPage,
    CameraPage,
    UpdateLocationPage,
    WelcomePage,
    OrderPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LocationPage,
    TabsPage,
    CameraPage,
    UpdateLocationPage,
    WelcomePage,
    OrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera, BarcodeScanner, ImagePicker, UniqueDeviceID,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

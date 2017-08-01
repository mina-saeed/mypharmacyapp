import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { Globalization } from 'ionic-native';
import { defaultLanguage, availableLanguages, sysOptions } from '../welcome/welcome.constants';
import { Storage } from '@ionic/storage';
import { TestStorageProvider } from '../../app/test-storage';

import { LocationPage } from '../location/location';
import { UpdateLocationPage } from '../update-location/update-location';
import { HomePage } from '../home/home';
import { CameraPage } from '../camera/camera';
import { OrderPage } from '../order/order';
import { SettingsPage } from '../settings/settings';
import { MenuPage } from '../menu/menu';
import { AccountPage } from '../account/account';

import { DetailedProductPage } from '../detailed-product/detailed-product';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  private translate: TranslateService;

  constructor( translate: TranslateService,public lang: TestStorageProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.translate = translate;
  }

  homePage = HomePage;
  locationPage = LocationPage;
  updateLocationPage = UpdateLocationPage;
  cameraPage = CameraPage;
  orderPage = OrderPage;
  settingsPage = SettingsPage;
  accountPage = AccountPage;
  detailedProductPage=DetailedProductPage;
}

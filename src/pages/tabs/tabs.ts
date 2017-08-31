import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { TestStorageProvider } from '../../app/test-storage';
import { LocationPage } from '../location/location';
import { UpdateLocationPage } from '../update-location/update-location';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { AccountPage } from '../account/account';
import { CategoriesPage } from '../categories/categories';


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

     // this.translate.use('en');

      //this.translate = translate;
    //  this.translate.use('en');
    
     // navCtrl.setRoot(TabsPage);
  }

  homePage = HomePage;
  locationPage = LocationPage;
  updateLocationPage = UpdateLocationPage;
  settingsPage = SettingsPage;
  accountPage = AccountPage;
  detailedProductPage=DetailedProductPage;
  categoriesPage = CategoriesPage;
      ionViewDidLoad() {
    //  this.navCtrl.setRoot(TabsPage);
  }



}

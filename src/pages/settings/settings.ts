import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';


/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private translate: TranslateService;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
     this.translate = translate;

    this.translate.use('en');
  }
    goBasket(){
    this.navCtrl.push(BasketPage);
  }
    goMenu(){
    this.navCtrl.push(MenuPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}

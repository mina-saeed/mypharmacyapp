import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { ContactusPage } from '../contactus/contactus';
import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  private translate: TranslateService;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
     this.translate = translate;
   // this.translate.use('ar');

  }
    goBasket(){

    this.navCtrl.push(BasketPage);
  }
    goContact(){

    this.navCtrl.push(ContactusPage);
  }
    goTerms(){

    this.navCtrl.push(TermsPage);
  }
    goPrivacy(){

    this.navCtrl.push(PrivacyPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}

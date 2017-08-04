import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';
import { BasketPage } from '../basket/basket';
<<<<<<< Updated upstream
import { MenuPage } from '../menu/menu';


/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  private translate: TranslateService;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
   this.translate = translate;
    //this.translate.use('en');
  }
  goBasket(){
    this.navCtrl.push(BasketPage);
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}

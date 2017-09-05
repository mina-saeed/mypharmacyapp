import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the DetailedOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detailed-order',
  templateUrl: 'detailed-order.html',
})
export class DetailedOrderPage {

  private translate: TranslateService;

  constructor(translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
     this.translate = translate;

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedOrderPage');
  }
    goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); 
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }

}

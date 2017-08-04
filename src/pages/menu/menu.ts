import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';
import { BasketPage } from '../basket/basket';

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
    goMenu(){
    this.navCtrl.push(MenuPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}

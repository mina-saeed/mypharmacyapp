import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the PersonReminderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-person-reminder',
  templateUrl: 'person-reminder.html',
})
export class PersonReminderPage {
  private translate: TranslateService;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
    this.translate = translate;

  }
  goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); 
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonReminderPage');
  }

}

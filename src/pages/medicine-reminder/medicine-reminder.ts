import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';

import { PersonReminderPage } from '../person-reminder/person-reminder';
import { TimeReminderPage } from '../time-reminder/time-reminder';

/**
 * Generated class for the MedicineReminderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-medicine-reminder',
  templateUrl: 'medicine-reminder.html',
})
export class MedicineReminderPage {
  private translate: TranslateService;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
  this.translate = translate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicineReminderPage');
  }
  goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); 
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }
}

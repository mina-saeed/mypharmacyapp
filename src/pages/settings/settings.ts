import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, App} from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import { RemindmePage } from '../remindme/remindme';
import { RemindersMedicinesListPage } from '../reminders-medicines-list/reminders-medicines-list';
import { MedicineReminderPage } from '../medicine-reminder/medicine-reminder';
import { TimeReminderPage } from '../time-reminder/time-reminder';

import {OnInit, ViewChild} from '@angular/core';
import { ReminderPage } from '../reminder/reminder';
import { LanguagePage } from '../language/language';


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
  @ViewChild(Navbar) navBar:Navbar;

  constructor(private app: App, translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
     this.translate = translate;

  }
  goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); //kda hatly el default!! hwa ma3mlsh select
  }
    goMenu(){
    this.navCtrl.push(MenuPage);
  }
  goToReminderPage(){
    this.navCtrl.push(ReminderPage);
  }
  goToLanguage(){
    //this.navCtrl.push(LanguagePage, 1);
      this.app.getRootNav().push(LanguagePage, 1);

}
    goRemindme(){
    this.navCtrl.push(RemindmePage);
  }
    goMedicineReminder(){
    this.navCtrl.push(MedicineReminderPage);
  }

      ionViewDidLoad() {
    /*    this.navBar.backButtonClick = (e:UIEvent) => {
            console.log("Back button clicked");
            this.navCtrl.parent.viewCtrl.dismiss();
         }; */
      }

}

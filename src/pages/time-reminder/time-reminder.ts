import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the TimeReminderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-time-reminder',
  templateUrl: 'time-reminder.html',
})
export class TimeReminderPage {
  private translate: TranslateService;

  constructor(translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
     this.translate = translate;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeReminderPage');
  }

}

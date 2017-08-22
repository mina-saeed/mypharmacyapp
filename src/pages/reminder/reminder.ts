import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the ReminderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private localNotifications: LocalNotifications) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReminderPage');
    this.localNotifications.schedule({
   text: 'Delayed ILocalNotification',
   at: new Date(new Date().getTime() + 3600),  //in milliseconds
   led: 'FF0000',
   sound: null
});

console.log(new Date().getTime() + 5600);
  }

}

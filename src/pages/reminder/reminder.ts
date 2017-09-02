import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NativeStorage } from '@ionic-native/native-storage';
import { RemindersMedicinesListPage } from '../reminders-medicines-list/reminders-medicines-list';

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

  maxReminderID = 0;
  patient: string;

  members= [//{
  //  name: '',
  //  medicinces: [
    //  {name:'', time: '', repeat:'daily', notificatioObject: '' },
      //{},
    //  {}
    //]
//  }
]

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private localNotifications: LocalNotifications) {


    this.getOrSetReminders();
    this.getOrSetMaxReminderID();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReminderPage');
    console.log(this.members);
  /*  this.localNotifications.schedule({
   text: 'Delayed ILocalNotification',
   at: new Date(new Date().getTime() + 3600),  //in milliseconds
   led: 'FF0000',
   sound: null
});*/

  console.log(new Date().getTime() + 5600);
  }

  addPatient(){
    if((/\S/.test(this.patient)))
    {
      if (this.checkDuplicates(this.members, this.patient.toString())){
        alert("Name already in the list");
      }else{
        let body = {
          name: this.patient,  //should check to be unique
          medicinces: [

        ]}
        this.patient = "";
        this.members.push(body);
        //now save it in local storage
        this.nativeStorage.setItem('reminders', this.members);
        console.log(this.members);
      }

    }else{
      alert("Cannot be empty");
    }

  }
  checkDuplicates(arr, str){
    for (let x = 0; x < arr.length; x++)
    {
      console.log(arr[x].name);
      if(arr[x].name == str){
        console.log("Duplicated!!!")
        return true;
      }
    }
    return false;
  }
  goToMedicines(res){
    console.log(res);
    console.log(this.members.indexOf(res));
    this.navCtrl.push(RemindersMedicinesListPage, {current: res, index: this.members.indexOf(res)});
  }
  deleteReminder(res){
    this.members.splice(this.members.indexOf(res), 1);
    this.nativeStorage.setItem('reminders', this.members);
  }

  getOrSetMaxReminderID(){
    //max reminder id to keep track of every id of every notification, to be able to modify or delete
    this.nativeStorage.getItem('maxReminderID')
    .then(
      data => {this.maxReminderID = data
      console.log("got items", data)},   //if yes there's data, set members = el data di el object eli foo2

      error => {console.error("setting item", error)
      this.nativeStorage.setItem('maxReminderID', this.maxReminderID)} //if no lssa mafeesh, e3ml new one! tkoon members fadya 5ales
    );

  }
  getOrSetReminders(){
    this.nativeStorage.getItem('reminders')
    .then(
      data => {this.members = data
      console.log("got items", data)},   //if yes there's data, set members = el data di el object eli foo2

      error => {console.error("setting item", error)
      this.nativeStorage.setItem('reminders', this.members)} //if no lssa mafeesh, e3ml new one! tkoon members fadya 5ales
  );
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { DetailedRemindersMedicinesListPage } from '../detailed-reminders-medicines-list/detailed-reminders-medicines-list';


/**
 * Generated class for the RemindersMedicinesListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reminders-medicines-list',
  templateUrl: 'reminders-medicines-list.html',
})
export class RemindersMedicinesListPage {
  index:number;
  medicine: string;
  members:any;
  currentMember =[];

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {

    this.index = this.navParams.get('index');
    this.currentMember = this.navParams.get('current');
    console.log(this.currentMember);
    console.log(this.index);
    this.nativeStorage.getItem('reminders')
    .then(
      data => {this.members = data
      console.log("got items", data)},   //if yes there's data, set members = el data di el object eli foo2

      error => {console.error("error", error)
      } //if no lssa mafeesh, e3ml new one! tkoon members fadya 5ales
  );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RemindersMedicinesListPage');
  }



  addMedicine(){
    if(this.medicine != null)
    {
      if (this.checkDuplicates(this.currentMember["medicinces"], this.medicine.toString())){
        alert("Name already in the list");
      }else{
        let body = {
          name: this.medicine,  //should check to be unique
          remindEvery: "no reminder yet",
          remindID: -1,
          remindObject: null
        }
        this.medicine = "";
        this.currentMember["medicinces"].push(body);
        this.members[this.index] = this.currentMember;
        //now save it in local storage
        this.nativeStorage.setItem('reminders', this.members);
        console.log(this.members);
      }

    }else{
      alert("cannot be empty");
    }

  }
  deleteMedicine(res){
    this.currentMember["medicinces"].splice(this.currentMember["medicinces"].indexOf(res), 1);
    this.members[this.index] = this.currentMember;
    //now save it in local storage
    this.nativeStorage.setItem('reminders', this.members);
  }


  checkDuplicates(arr, str){
    for (let x = 0; x < arr.length; x++)
    {
      console.log(arr[x]);
      if(arr[x].name == str){
        console.log("Duplicated!!!")
        return true;
      }
    }
    return false;
  }
  goToMedicineReminder(res){
  //  console.log(this.currentMember["medicinces"].indexOf(res));
    console.log(res);
    this.navCtrl.push(DetailedRemindersMedicinesListPage, {indexOfMember:this.index, all:this.members, current: res, indexOfMedicine: this.currentMember["medicinces"].indexOf(res)});
  }

}

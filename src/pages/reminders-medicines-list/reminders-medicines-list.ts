import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { DetailedRemindersMedicinesListPage } from '../detailed-reminders-medicines-list/detailed-reminders-medicines-list';
import { TranslateService } from 'ng2-translate';

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
  currentLanguage: string;
  private translate: TranslateService;
  text:string;

  constructor(translate: TranslateService, private alertCtrl: AlertController,private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {

    this.translate = translate;
    if (this.translate.currentLang =='ar') {
      this.currentLanguage = "ar";
      this.text = "لا تذكير حتى الآن";
    }
    else {
      this.currentLanguage = "en";
      this.text = "No reminders yet";
    }

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
    if(!(/\S/.test(this.medicine)) || this.medicine == null)
    {
        //    alert("cannot be empty");
        if(this.currentLanguage == "en"){
          this.customAlert("Error", "Do not leave any field empty!", "Close");
        }else if(this.currentLanguage =="ar"){
          this.customAlert("خطأ", "لا تترك أي مساحة فارغة", "أغلق");
        }

    }else{

      if (this.checkDuplicates(this.currentMember["medicinces"], this.medicine.toString())){
        if(this.currentLanguage == "en"){
          this.customAlert("Error", "Medicine is already in the list", "Close");
        }else if(this.currentLanguage =="ar"){
          this.customAlert("خطأ", "تم تعيينه من قبل", "أغلق");
        }
      }else{
        let body = {
          name: this.medicine,  //should check to be unique
          remindEvery: this.text,
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
  customAlert(title, message, buttonText){
    let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: buttonText,

          }
        ]
      });
      alert.present();
  }
}

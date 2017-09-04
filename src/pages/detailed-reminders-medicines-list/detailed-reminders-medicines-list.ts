import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateService } from 'ng2-translate';
import { DatePicker } from '@ionic-native/date-picker';
/**
 * Generated class for the DetailedRemindersMedicinesListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detailed-reminders-medicines-list',
  templateUrl: 'detailed-reminders-medicines-list.html',
})
export class DetailedRemindersMedicinesListPage {

  maxReminderID: number;
  members = [];
  currentMedicine: any;
  indexOfMedicine: number;
  indexOfMember: number;

    private translate: TranslateService;
    currentLanguage: string;

    timePicked = false;
    chosenDate:Date;

  constructor(private datePicker: DatePicker, translate: TranslateService, private alertCtrl: AlertController,private localNotifications: LocalNotifications, private nativeStorage: NativeStorage,public navCtrl: NavController, public navParams: NavParams) {
    this.translate=translate;
  if (this.translate.currentLang =='ar') {
    this.currentLanguage = "ar";
  }
  else {
    this.currentLanguage = "en";
  }

    this.members = this.navParams.get('all');
    this.currentMedicine = this.navParams.get('current');
    this.indexOfMedicine = this.navParams.get('indexOfMedicine');
    this.indexOfMember = this.navParams.get('indexOfMember');
    this.getMaxReminderID();

    if(this.currentMedicine["remindEvery"] == null){

        this.currentMedicine["remindEveryAr"] = "لا تذكير حتى الآن";
        this.currentMedicine["remindEvery"]= "No reminders yet";

    }

    console.log(this.indexOfMember);
  //  this.addReminder();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedRemindersMedicinesListPage');
  }
  addReminder(duration){


    //this.localNotifications.clearAll();
//  console.log(this.localNotifications.getAll());
  console.log("max Rem", this.maxReminderID);

  //TimestampConvert.com use this along with menna's work so that user decide which time in the day
  //use firstAt... example using at at: 1503429522.. make it tomorrow at time he specifies

  if(this.currentMedicine["remindID"] > -1){
    if(this.currentLanguage == "en"){
      this.customAlert("Error", "Reminder already set", "Close");
    }else if(this.currentLanguage =="ar"){
      this.customAlert("خطأ", "تم تعيينه من قبل", "أغلق");
    }
  }else{
    //.....
    let text = "";
    if(this.currentLanguage == "en"){
      text = "Reminder to take: ";
    }else if(this.currentLanguage =="ar"){
      text = "أذكر لي أن تأخذ: ";
    }
     if( duration.toString() == "Daily")
      {
        this.localNotifications.schedule({
          id: this.maxReminderID,
          text: text + this.currentMedicine["name"],
          every: "day",
          at: this.chosenDate
        });
      }else if( duration.toString() == "Weekly"){
        this.localNotifications.schedule({
          id: this.maxReminderID,
          text: text + this.currentMedicine["name"],
          every: "week",
          at: this.chosenDate
        });
      }else if( duration.toString() == "Monthly"){
        this.localNotifications.schedule({
          id: this.maxReminderID,
          text: text + this.currentMedicine["name"],
          every: "month",
          at: this.chosenDate
        });
      }
      //done for all cases
      let durationTextAr = duration.toString();

        if (duration.toString() == "Daily"){
          durationTextAr = "يوميا";
        }else if (duration.toString() == "Weekly"){
          durationTextAr = "أسبوعيا";
        } else if (duration.toString() == "Monthly"){
          durationTextAr = "شهريا";
        }

      this.currentMedicine["remindEvery"] = duration.toString();
      this.currentMedicine["remindEveryAr"] = durationTextAr;
      this.currentMedicine["remindID"] = this.maxReminderID;
      this.currentMedicine["remindObject"] = this.localNotifications.get(this.maxReminderID);
      this.members[this.indexOfMember]["medicinces"][this.indexOfMedicine] = this.currentMedicine;
      this.nativeStorage.setItem('reminders', this.members);
      this.updateMaxReminderID();
      console.log(this.members);
      console.log();


  }


  }
  getMaxReminderID(){
    //max reminder id to keep track of every id of every notification, to be able to modify or delete
    this.nativeStorage.getItem('maxReminderID')
    .then(
      data => {this.maxReminderID = data
      console.log("got items", data)},   //if yes there's data, set members = el data di el object eli foo2

      error => {console.error("Error:", error)}
    );

  }
  updateMaxReminderID(){
    this.maxReminderID = this.maxReminderID + 1;
    this.nativeStorage.setItem('maxReminderID', this.maxReminderID);
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
  pickSchedule(){
        this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      }).then(
      date => {  console.log('Got date: ', date)
    this.chosenDate = date
  console.log(this.chosenDate);
  this.timePicked = true;
  },

      err => {console.log('Error occurred while getting date: ', err);
    this.timePicked = false;
  }
      );

  }
}

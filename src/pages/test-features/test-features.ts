import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { DatePicker } from '@ionic-native/date-picker';
import { NativeStorage } from '@ionic-native/native-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


/**
 * Generated class for the TestFeaturesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-test-features',
  templateUrl: 'test-features.html',
})
export class TestFeaturesPage {

    medicineID:any; //should be replaced when moved from test page
    maxReminderID = 0;
    schedules = [];
    chosenDate:Date;
    timePicked = false;
    currentSchedule = {
      scheduleID: 0,
      medicineID: '',
      medicineName: '',
      date: new Date(),
    }

    url:string;
    categories:any;
    currentLanguage: any;
    private translate: TranslateService;
  constructor(private localNotifications: LocalNotifications, private nativeStorage: NativeStorage, private datePicker: DatePicker, translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public http:Http) {

        this.url = 'http://146.185.148.66:3003/';
        this.getOrSetSchedules();
        this.getOrSetMaxReminderID(); //we use reminder, 3shan may7slsh conflicts

      /*  this.translate = translate;
        if (this.translate.currentLang =='ar') {
          this.currentLanguage = "ar";
        }
        else {
          this.currentLanguage = "en";
        }*/
  }

  ionViewDidLoad() {

  }





  //or use medicine ID 3la tool
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
  getOrSetSchedules(){
    this.nativeStorage.getItem('schedules')
    .then(
      data => {this.schedules = data
      console.log("got items", data)},   //if yes there's data, set members = el data di el object eli foo2

      error => {console.error("setting item", error)
      this.nativeStorage.setItem('schedules', this.schedules)} //if no lssa mafeesh, e3ml new one! tkoon members fadya 5ales
  );
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

  addSchedule(duration){


    if(this.checkScheduled(this.schedules, "defs1fs") == true){
      alert("Already has a reminder! Go away!");
    }else{
      //.....
       if( duration.toString() == "Daily")
        {
          this.localNotifications.schedule({
            id: this.maxReminderID,
            text: 'Reminder to order:' + this.currentSchedule.medicineName,
            at: this.chosenDate,
            every: "day"
          });
        }else if( duration.toString() == "Weekly"){
          this.localNotifications.schedule({
            id: this.maxReminderID,
            text: 'Reminder to order:' + this.currentSchedule.medicineName,
            at: this.chosenDate,
            every: "week"
          });
        }else if( duration.toString() == "Monthly"){
          this.localNotifications.schedule({
            id: this.maxReminderID,
            text: 'Reminder to order:' + this.currentSchedule.medicineName,
            at: this.chosenDate,
            every: "month"
          });
        }
        console.log(this.maxReminderID);
        this.currentSchedule.medicineID = "1defsfs";
        this.currentSchedule.scheduleID = this.maxReminderID;
        this.currentSchedule.medicineName = "dsdfsf";
        this.currentSchedule.date = this.chosenDate;

        this.schedules.push(this.currentSchedule);

        //just to reset everything
        /*this.localNotifications.clearAll();
        this.maxReminderID = -1;
        this.schedules = [];*/

        this.nativeStorage.setItem('schedules', this.schedules);


        this.updateMaxReminderID();
        alert("Schedule set successfully!")

      }
      this.timePicked = false;


  }
  pickSchedule(){
        this.datePicker.show({
      date: new Date(),
      mode: 'date',
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

  checkScheduled(arr, id){
    for (var x = 0; x < arr.length; x++){
      if(arr[x]["medicineID"] == id){
        return true;
      }else{
        return false;
      }
    }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DatePicker } from '@ionic-native/date-picker';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the DetailedProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detailed-product',
  templateUrl: 'detailed-product.html',
})
export class DetailedProductPage {
    //medicineID:any; //should be replaced when moved from test page
    maxReminderID = 0;
    schedules = [];
    chosenDate:Date;
    currentSchedule = {
      scheduleID: 0,
      medicineID: '',
      medicineName: '',
      date: new Date(),
    }

    timePicked = false;
    categories:any;
    currentLanguage: any;
    url:string;
    product= {  //change default data according to mahmoud, or figure out a better way of doing deault ad empty values

      data: [
      {
        
      }


    ]};

    public base64Image: string;
  private translate: TranslateService;
  constructor(private camera: Camera, private imagePicker: ImagePicker, private alertCtrl: AlertController,private datePicker: DatePicker, translate: TranslateService,public navCtrl: NavController, public navParams: NavParams,public http:Http, private nativeStorage: NativeStorage,private localNotifications: LocalNotifications) {
   this.translate = translate;
   this.translate=translate;
   if (this.translate.currentLang =='ar') {
     this.currentLanguage = "ar";
   }
   else {
     this.currentLanguage = "en";
   }
           this.url = 'http://146.185.148.66:3003/';
        this.product.data = JSON.parse(this.navParams.get("_body")); //nav controller
        console.log(this.product.data);
   //this.translate.use('en'); // to be commented
   this.getOrSetSchedules();
   this.getOrSetMaxReminderID(); //we use reminder, 3shan may7slsh conflicts
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedProductPage');
  }

  pickPhoto() {


  }

  requirePrescription = true;


    ///LATER MOVE IT TO HOME PAGE + MEDICINES PAGE
   addToCart(medicine){
    //get what in local storage put it in a json object
    //push new object in array
    //set it back!

    //this.requirePrescription = false; //medicine["required"]

    if(this.requirePrescription == true){


          let alert = this.alertCtrl.create({
        title: 'Prescription Required',
        message: 'This medicine requires a prescription.',
        buttons: [
          {
            text: 'Camera',
            handler: () => {
                console.log('camera upload');
                const options: CameraOptions = {
                quality: 100,
                destinationType: this.camera.DestinationType.FILE_URI, //this depends on mahmoud, file type! if he wants base64!
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
              }

              this.camera.getPicture(options).then((imageData) => {
               // imageData is either a base64 encoded string or a file URI
               // If it's base64:
               //let base64Image = 'data:image/jpeg;base64,' + imageData;
               this.base64Image = imageData;
               console.log(this.base64Image);
               this.addToCartHelper(medicine, this.base64Image);


              }, (err) => {
               // Handle error
              });
            }
          },
          {
            text: 'Gallery',
            handler: () => {
              console.log('gallery upload');
              let options = {
                maximumImagesCount: 1, //how many pictures to pick??!
                width: 300,
                height: 300,
                quality : 75
              };

              this.imagePicker.getPictures(options).then((results) => {
                for (var i = 0; i < results.length; i++) {
                  this.base64Image = results[i];
                  console.log('Image URI: ' + results[i]);
                  console.log(this.base64Image);
                  this.addToCartHelper(medicine, this.base64Image);
                }
              }, (err) => {

              });
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();

    }else{
      this.addToCartHelper(medicine, ""); //empty prescription
    }




  }
  addToCartHelper(medicine, prescription){
    this.nativeStorage.getItem('order')
    .then(data =>{

              console.log("current data::", data);
              let medicineTobeAdded = {
                id:medicine["id"], name:medicine["name_en"], price:medicine["price"], qty:1, prescription: prescription
              }


              //if same, just increment qty!
              var userExists = false;
              var found = false;
              for(var x = 0; x< data["order"].length; x ++)
              {
                if(!userExists){
                  if (data["order"][x]["id"] == medicineTobeAdded.id){
                    data["order"][x]["qty"] = data["order"][x]["qty"] + 1;
                    userExists = true;
                    found = true;
                  }
                }
              }
              if(!found)
              {
                data["order"].push(medicineTobeAdded);

              }

            //  console.log("To be added:", medicineTobeAdded);

            //  data["order"].push(medicineTobeAdded);

            //  console.log("Current data from local storage:", data)

              this.saveOrder(data);


              //just to test
              this.nativeStorage.getItem('order')
              .then(data =>{
                        console.log("now in local", data);
                        //console.log("got data 5alas: ",data);
                        //alert(data);
                        } ,
                error => console.error(error)
              );

          //    console.log("Now data in local:", this.getOrder());
              } ,
      error => console.error(error)
    );

  }
  saveOrder(localData){  //save to local storage, //later, save each time add to cart,and deleter w kda
        this.nativeStorage.setItem('order', localData)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
  }


  setGetHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    return headers;
  }


    goBasket(){
    this.navCtrl.push(BasketPage);
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
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


    if(this.checkScheduled(this.schedules, this.currentSchedule.scheduleID) == true){
    //  alert("Already has a schedule!");
      if(this.currentLanguage == "en"){
        this.customAlert("Error", "Schedule already set", "Close");
      }else if(this.currentLanguage =="ar"){
        this.customAlert("خطأ", "تم تعيينه من قبل", "أغلق");
      }
    }else{
      //.....
        let text = "";
        if(this.currentLanguage == "en"){
          text = "Reminder to order: ";
        }else if(this.currentLanguage =="ar"){
          text = "تذكير لي أن طلب: ";
        }
       if( duration.toString() == "Daily")
        {
          this.localNotifications.schedule({
            id: this.maxReminderID,
            text: text + this.currentSchedule.medicineName,
            at: this.chosenDate,
            every: "day"
          });
        }else if( duration.toString() == "Weekly"){
          this.localNotifications.schedule({
            id: this.maxReminderID,
            text: text + this.currentSchedule.medicineName,
            at: this.chosenDate,
            every: "week"
          });
        }else if( duration.toString() == "Monthly"){
          this.localNotifications.schedule({
            id: this.maxReminderID,
            text: text + this.currentSchedule.medicineName,
            at: this.chosenDate,
            every: "month"
          });
        }
        console.log(this.maxReminderID);
        this.currentSchedule.medicineID = this.product.data["id"];
        this.currentSchedule.scheduleID = this.maxReminderID;
        this.currentSchedule.medicineName = this.product.data["name_en"];
        this.currentSchedule.date = this.chosenDate;

        this.schedules.push(this.currentSchedule);

        //just to reset everything
        /*this.localNotifications.clearAll();
        this.maxReminderID = -1;
        this.schedules = [];*/

        this.nativeStorage.setItem('schedules', this.schedules);
        this.updateMaxReminderID();
        if(this.currentLanguage == "en"){
          this.customAlert("Done", "Schedule set successfully", "Close");
        }else if(this.currentLanguage =="ar"){
          this.customAlert("ناجح", "جدولة مجموعة بنجاح", "أغلق");
        }

      }
      this.timePicked = false;


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

  checkScheduled(arr, id){
    for (var x = 0; x < arr.length; x++){
      if(arr[x]["medicineID"] == id){
        return true;
      }else{
        return false;
      }
    }
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

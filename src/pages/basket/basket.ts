import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { sysOptions } from '../welcome/welcome.constants';
import { NativeStorage } from '@ionic-native/native-storage';
import { TrackOrderPage } from '../track-order/track-order';
import { MenuPage } from '../menu/menu';
import { AddressesPage } from '../addresses/addresses';
import { PromoCodePage } from '../promo-code/promo-code';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the BasketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {
 // languages = availableLanguages;
     public base64Image: string;
  public promo: boolean;
  promoMessage:string;
  noResultsBool = false;
  promoInput = "";
  selectedLanguage = sysOptions.systemLanguage;
  public showSearchResult: boolean;
  public showPage: boolean;
    searchResults= {  //change default data according to mahmoud, or figure out a better way of doing deault ad empty values

    data: [

    {id:-1, name:"", description:"", category:"", barcode:-1, milligrams:0, price:0},


  ]};

  emptyOrderData = {
     //unique id and evey data
    userInfo: {
    userID: 4654,
      location : {
        city : "cairo",
        street : "streetvalue",
        location: "zamalek" ,
      }
    },
    order:[]};
  orderData = {
    userInfo: {
      userID: -1,
      //different from all the app
        city : "",
        street : "",
        location: "" ,
        writtenAddress: "",
        username: "",
        date: "",
        time:"",
        mobile:""

    },
    order:[

    ],
  prescription: null};

  disableButton:boolean = false;
  empty: boolean;
  url:string;
  totalPrice = 0;
  currentAddress:string;
  currentLanguage: string;
  private translate: TranslateService;

  constructor(private camera: Camera, private imagePicker: ImagePicker,private alertCtrl: AlertController,translate: TranslateService,
               public navCtrl: NavController,
               public navParams: NavParams,
               public http:Http,
               private nativeStorage: NativeStorage) {
                 this.promoMessage = "No promocode added!";
    this.translate = translate;
    if (this.translate.currentLang =='ar') {
      this.currentLanguage = "ar";
    }
    else {
      this.currentLanguage = "en";
    }
    this.promo=false;
    //this.translate.use('ar');
    this.url = 'http://146.185.148.66:3009/';
    if(this.navParams.get('defaultOrNot') == 1){ //kda hwa selected an addres
      this.currentAddress = this.navParams.get('currentAddress');
    }else{ //hatly el default
      if(this.currentLanguage == "en"){
        this.currentAddress = "Default Address";
      }else if(this.currentLanguage =="ar"){
        this.currentAddress = "العنوان الثابت";
      }

    }

    console.log(this.currentAddress);
    //this.updateTotalPrice();
    //this.saveOrder();


    this.getOrder();
    this.updateTotalPrice();
  //  this.checkEmptyOrder();
  }

  ionViewDidLoad() {

  }
    setGetHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    return headers;
  }
    updateListByName(ev) {
      //this.noResultsBool = true;
      this.showPage = false;
      this.showSearchResult = true; //when start searching, show the list
      //if statement make it false when deleted all characters!!
      //break if backspace and emtpy 3shan el requests

      if(ev.keyCode == 8)
      {
        if(ev.target.value.toString() == ""){
          this.showSearchResult = false; //and true to show other components
          this.showPage = true;

        }
      }
      this.url = 'http://146.185.148.66:3003/';
      this.http.get(this.url + 'search/' + ev.target.value.toString(), new RequestOptions({headers: this.setGetHeaders()}))
        .map(res => res).subscribe(data => {
        console.log(this.url + 'search/' + ev.target.value.toString());

          //this.orderTest["data"] = JSON.parse(data["_body"].toString());
          if(data["_body"].toString() == "No results found"){
            this.noResultsBool = false;
            this.searchResults["data"] = [{id:-1, name:"No results found", description:"", category:"", barcode:-1, milligrams:0, price:0}]; //empty ot message
          }else{
            this.noResultsBool = true;
            this.searchResults["data"] = JSON.parse(data["_body"].toString());
          }
          console.log(data);
        });

    //  console.log(ev.target.value);
      //console.log(this.searchResults["data"][0]["name"]);
      //this.orderTest["data"].pop();
    }
    onCancelByName(ev){
      this.showSearchResult = false; //and true to show other components
      this.showPage = true;
    }
  //code rewritten beta3 getIndex... 3shan msh 3aref a7oto f function, always return undefined
  //get index of array, by the order ID
  removeByID(i){
    for(var x = 0; x<this.orderData.order.length; x++){
      if(this.orderData.order[x]["id"] == i){

        this.orderData.order.splice(x,1); //proper way to remove by index
        this.updateTotalPrice();
        //this.saveOrder();
        break;
      }
    }
  }
  updateTotalPrice(){ //rename it, let it updateTotalPrice
    //needs a better, more efficient implementation
    //instad, get total price! and not calling it each time in each function

    this.totalPrice = 0; //reset it to recalculate
    var current = this.orderData.order;
    for(var x = 0; x<current.length; x++){
      this.totalPrice = this.totalPrice + (current[x]["price"] * current[x]["qty"]);
    }
  }
  deleteButton(id){
    this.removeByID(id);
    this.updateTotalPrice();
    //this.saveOrder();
  }
  increment(id){

    //i know this loop is repeated so many times, bas msh la2i 7al
    var current = this.orderData.order;
    for(var x = 0; x<current.length; x++){
      if(current[x]["id"] == id){

        current[x]["qty"]++;
        this.updateTotalPrice(); //udate the price
       // this.saveOrder();
        break;
      }
    }

  }
  decrement(id){
    //check if qty == 1, either make it removeByID or no more decrement

    var current = this.orderData.order;
    for(var x = 0; x<current.length; x++){
      if(current[x]["id"] == id){
        if(current[x]["qty"] == 1){
          if(this.currentLanguage == "en"){
            this.customAlert("Error", "Cannot decrement below 1", "Close");
          }else if(this.currentLanguage =="ar"){
            this.customAlert("خطأ", "لا يمكن أن تنخفض تحت واحد", "أغلق");
          }
          break;
        }else{
          current[x]["qty"]--;
          this.updateTotalPrice(); //udate the price
          //this.saveOrder();
          break;
        }
      }
    }
  }
  //everything is done! now confirm order
  confirm(){
 /*   if(this.empty == true){
      //alert("No orders to confirm");
    }else
    { */
      this.orderData.userInfo.writtenAddress = this.currentAddress;

      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
      headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

  console.log(this.orderData);

    let body = {
      city:  this.orderData.userInfo.city,
      location: this.orderData.userInfo.location,
      street:this.orderData.userInfo.street,
      type: "order",
      order: this.orderData.order,
      userID:this.orderData.userInfo.userID,
      username:this.orderData.userInfo.username,
      date: this.orderData.userInfo.date,
      time: this.orderData.userInfo.time,  
      mobile: this.orderData.userInfo.mobile
    }
    console.log(body);
      this.http.post(this.url + 'order/submit', body, new RequestOptions({headers:headers}))
      .map(res => res).subscribe(data => {
        console.log(data);

        this.navCtrl.push(TrackOrderPage, this.orderData);
      }, err => {
        console.log(err);
      });
      console.log("done");
  //  }

  }


  //the concept may be: first when app loaded initialize the local storage order with empties with device id
  //if it is empty!! if not empty mate3mlsh initialize
  //then when continue guest, get the data, update it then set the order local storage back
  //smae when new order, get it, push an order to the array and put it back
  saveOrder(localData){  //save to local storage, //later, save each time add to cart,and deleter w kda
        this.nativeStorage.setItem('order', localData)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
  }
   getOrder(){ //get from local sotrage
          this.nativeStorage.getItem('order')
        .then(data =>{
          this.orderData = data;
                  console.log(data);
                  this.checkEmptyOrder();
                  //console.log("got data 5alas: ",data);
                  //alert(data);
                  } ,
          error => console.error(error)
        );
  }
    goMenu(){
    this.navCtrl.push(MenuPage);
  }
  openPromo(){
    //this.promo=true;
    this.navCtrl.push(PromoCodePage);
  }
  addPromo(){

  }
  openCart(){
    this.promo=false;
  }
  changeAddress(){
    this.navCtrl.push(AddressesPage); //kda hatly el default!! hwa ma3mlsh select
  }
  checkEmptyOrder(){
    console.log( "before checkig",this.orderData["prescription"]);
    if(this.orderData.order.length == 0 && this.orderData["prescription"] == null)
    {
      this.empty = true;
      this.disableButton = true;
    }else{
      this.empty = false;
      this.disableButton = false;
    }
    console.log(this.empty);
    console.log( "after checkig",this.orderData["prescription"]);
  }
  clearPrescription(){
    this.orderData["prescription"] = null;
    this.checkEmptyOrder();
   // this.saveOrder();
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
        requirePrescription = "No";
    addToCart(medicine){
     //get what in local storage put it in a json object
     //push new object in array
     //set it back!
     console.log(medicine);
     console.log(medicine["requirePrescription"]);
     this.requirePrescription = medicine["requirePrescription"]; //medicine["required"]
     console.log(this.requirePrescription=="Yes");

     if(this.requirePrescription == "Yes"){

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
       console.log("d5al");
       this.addToCartHelper(medicine, ""); //empty prescription
     }




    }
    addToCartHelper(medicine, prescription){
     this.nativeStorage.getItem('order')
     .then(data =>{

               console.log("current data::", data);
               let medicineTobeAdded = {
                 id:medicine["id"], name:medicine["name_english"], price:medicine["price"], qty:1, prescription: prescription
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

}

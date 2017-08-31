import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
  public promo: boolean;
  promoMessage:string;
  promoInput = "";
  selectedLanguage = sysOptions.systemLanguage;
  orderData = {
    userInfo: {
      userID: -1,
      //different from all the app
        city : "",
        street : "",
        location: "" ,
        writtenAddress: ""

    },
    order:[

    ],
  prescription: null};

  disableButton:boolean = false;
  empty: boolean;
  url:string;
  totalPrice = 0;
  currentAddress:string;
  private translate: TranslateService;

  constructor(translate: TranslateService,
               public navCtrl: NavController,
               public navParams: NavParams,
               public http:Http,
               private nativeStorage: NativeStorage) {
                 this.promoMessage = "No promocode added!";
    this.translate = translate;
    this.promo=false;
    //this.translate.use('ar');
    this.url = 'http://146.185.148.66:3009/';
    if(this.navParams.get('defaultOrNot') == 1){ //kda hwa selected an addres
      this.currentAddress = this.navParams.get('currentAddress');
    }else{ //hatly el default
      this.currentAddress = "Default Address";
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

  //code rewritten beta3 getIndex... 3shan msh 3aref a7oto f function, always return undefined
  //get index of array, by the order ID
  removeByID(i){
    for(var x = 0; x<this.orderData.order.length; x++){
      if(this.orderData.order[x]["id"] == i){

        this.orderData.order.splice(x,1); //proper way to remove by index
        this.updateTotalPrice();
        this.saveOrder();
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
    this.saveOrder();
  }
  increment(id){

    //i know this loop is repeated so many times, bas msh la2i 7al
    var current = this.orderData.order;
    for(var x = 0; x<current.length; x++){
      if(current[x]["id"] == id){

        current[x]["qty"]++;
        this.updateTotalPrice(); //udate the price
        this.saveOrder();
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
          console.log("cannot decrement below 1!");
          break;
        }else{
          current[x]["qty"]--;
          this.updateTotalPrice(); //udate the price
          this.saveOrder();
          break;
        }
      }
    }
  }
  //everything is done! now confirm order
  confirm(){
    if(this.empty == true){
      alert("No orders to confirm");
    }else
    {
      this.orderData.userInfo.writtenAddress = this.currentAddress;

      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
      headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

  console.log(this.orderData);

      this.http.post(this.url + 'order/submit', JSON.stringify(this.orderData), new RequestOptions({headers:headers}))
      .map(res => res).subscribe(data => {
        console.log(data);

        this.navCtrl.push(TrackOrderPage, this.orderData);
      }, err => {
        console.log(err);
      });
      console.log("done");
    }

  }


  //the concept may be: first when app loaded initialize the local storage order with empties with device id
  //if it is empty!! if not empty mate3mlsh initialize
  //then when continue guest, get the data, update it then set the order local storage back
  //smae when new order, get it, push an order to the array and put it back
  saveOrder(){  //save to local storage, //later, save each time add to cart,and deleter w kda
        this.nativeStorage.setItem('order', this.orderData)
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
    this.saveOrder();
  }
}

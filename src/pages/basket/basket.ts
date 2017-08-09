import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { sysOptions } from '../welcome/welcome.constants';
import { NativeStorage } from '@ionic-native/native-storage';
import { TrackOrderPage } from '../track-order/track-order';


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

  selectedLanguage = sysOptions.systemLanguage;
  orderData = {
    userInfo: {
      userID: -1,
      //different from all the app
        city : "",
        street : "",
        location: "" ,

    },
    order:[

      {id:1, name:"Medicine1", price:4, qty:3},

      {id:2, name:"Medicine2", price:5, qty:5},

      {id:3, name:"Medicine3", price:2, qty:1},

    ]};

  url:string;
  totalPrice = 0;
  private translate: TranslateService;

  constructor(translate: TranslateService,
               public navCtrl: NavController,
               public navParams: NavParams,
               public http:Http,
               private nativeStorage: NativeStorage) {
    this.translate = translate;
     //this.translate.use('en');
    this.url = 'http://146.185.148.66:3009/';
    //this.updateTotalPrice();
    //this.saveOrder();

    //do it later!
//    this.getOrder();
    this.updateTotalPrice();
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

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
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
                  //console.log("got data 5alas: ",data);
                  //alert(data);
                  } ,
          error => console.error(error)
        );
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { Globalization } from 'ionic-native';
import { defaultLanguage, availableLanguages, sysOptions } from '../welcome/welcome.constants';
import { Storage } from '@ionic/storage';

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
      userID: 4654,
      location : {
        city : "cairo",
        street : "streetvalue",
        location: "zamalek" ,
      }
    },
    order:[

      {id:1, name:"Medicine1", price:4, qty:3},

      {id:2, name:"Medicine2", price:5, qty:5},

      {id:3, name:"Medicine3", price:2, qty:1},

    ]};

  url:string;
  totalPrice = 0;
  private translate: TranslateService;

  constructor(translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.translate = translate;
    this.url = 'http://146.185.148.66:3000/';
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
  }
  increment(id){

    //i know this loop is repeated so many times, bas msh la2i 7al
    var current = this.orderData.order;
    for(var x = 0; x<current.length; x++){
      if(current[x]["id"] == id){

        current[x]["qty"]++;
        this.updateTotalPrice(); //udate the price
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


    this.http.post(this.url + 'order/submit', JSON.stringify(this.orderData), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
    console.log("done");
  }
}

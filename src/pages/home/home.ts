import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { BasketPage } from '../basket/basket';
import { TranslateService } from 'ng2-translate';
import { TestStorageProvider } from '../../app/test-storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { MenuPage } from '../menu/menu';

import { DetailedProductPage } from '../detailed-product/detailed-product';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

  public showSearchResult: boolean;
  public showPage: boolean;
  url:string;

  private translate: TranslateService;
  constructor(translate: TranslateService,  private nativeStorage: NativeStorage, public lang: TestStorageProvider, public navCtrl: NavController,  public http:Http) {

    this.getOrder();//to initalize if empty
    this.translate = translate;
    //this.translate.use('en');
    this.showSearchResult = false;  //initialise things to be visible
    this.showPage = true;
    this.url = 'http://146.185.148.66:3003/';

}
  /*applyLanguage() {
    this.translate.use(this.selectedLanguage);
  }*/
  ionViewDidLoad(){
    //    this.getOrder();_//to initalize if empty
  }

  goCamera(){
          if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }
    this.navCtrl.push(CameraPage);
  }
  goBasket(){
    this.navCtrl.push(BasketPage);
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }
  openModal(){
    alert("This features has not been implemented yet!")
  }

  updateListByName(ev) {
    this.showPage = false;
    this.showSearchResult = true; //when start searching, show the list
    //if statement make it false when deleted all characters!!
    //break if backspace and emtpy 3shan el requests

    this.http.get(this.url + 'search/' + ev.target.value.toString(), new RequestOptions({headers: this.setGetHeaders()}))
      .map(res => res).subscribe(data => {
      console.log(this.url + 'search/' + ev.target.value.toString());

        //this.orderTest["data"] = JSON.parse(data["_body"].toString());
        if(data["_body"].toString() == "No results found"){
          this.searchResults["data"] = [{id:-1, name:"No results found", description:"", category:"", barcode:-1, milligrams:0, price:0}]; //empty ot message
        }else{
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

  addToCart(medicine){
    //get what in local storage put it in a json object
    //push new object in array
    //set it back!

    this.nativeStorage.getItem('order')
    .then(data =>{

              console.log("current data::", data);
              let medicineTobeAdded = {
                id:medicine["id"], name:medicine["name"], price:medicine["price"], qty:1
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




  setGetHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    return headers;
  }
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
                  console.log(data);
                  //console.log("got data 5alas: ",data);
                  //alert(data);
                  } ,
          error => {
            this.saveOrder(this.emptyOrderData);
            console.log("initialized order!");
          }
        );
  }


  detailedProduct(id){
    this.http.get(this.url + 'searchID/'+id, new RequestOptions({headers: this.setGetHeaders()}))
    .map(res => res).subscribe(pdata => {
      //  console.log(data);
      //  console.log("yey no error", pdata);
        if(pdata["_body"] == "no data"){
          alert("Invalid barcode!")
        }else{
          console.log(JSON.parse(pdata["_body"]));
          this.navCtrl.push(DetailedProductPage, {_body: pdata["_body"]});
        }

    },err =>{
      alert("Invalid barcode!");
    });
  }

}



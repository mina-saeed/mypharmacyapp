import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { BasketPage } from '../basket/basket';
import { TranslateService } from 'ng2-translate';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { Globalization } from 'ionic-native';
import { defaultLanguage, availableLanguages, sysOptions } from '../welcome/welcome.constants';

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

    url:string;
    product= {  //change default data according to mahmoud, or figure out a better way of doing deault ad empty values

      data: [
      {
        "id":"5973c9e890adc82244231977",
        "name_ar":"بانادول اكسترا",
        "description_ar":"Description",
        "category":null,
        "barcode":"6223002142369",
        "milligrams":"10",
        "price":null,
        "name_en":"Panadol Extra",
        "description_en":"No "
      }


    ]};


  private translate: TranslateService;
  constructor( translate: TranslateService,public navCtrl: NavController, public navParams: NavParams,public http:Http, private nativeStorage: NativeStorage) {
   this.translate = translate;
           this.url = 'http://146.185.148.66:3003/';
        this.product.data = JSON.parse(this.navParams.get("_body")); //nav controller
        console.log(this.product.data);
   //this.translate.use('en'); // to be commented
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedProductPage');
  }


  addToCart(medicine){
    //get what in local storage put it in a json object
    //push new object in array
    //set it back!

    this.nativeStorage.getItem('order')
    .then(data =>{

              console.log("current data::", data);
              let medicineTobeAdded = {
                id:medicine["id"], name:medicine["name_en"], price:medicine["price"], qty:1
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
        /*  if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }*/
    this.navCtrl.push(BasketPage);
  }

}

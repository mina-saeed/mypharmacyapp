import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { BasketPage } from '../basket/basket';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the PromoCodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-promo-code',
  templateUrl: 'promo-code.html',
})
export class PromoCodePage {


    promoValue:any;
    url:string;
    promoInput = "";

    private translate: TranslateService;
    currentLanguage: string;

  constructor(translate: TranslateService, private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.url = 'http://146.185.148.66:3009/';
    this.translate=translate;
  if (this.translate.currentLang =='ar') {
    this.currentLanguage = "ar";
  }
  else {
    this.currentLanguage = "en";
  }
    //this.url = 'http://146.185.148.66:3000/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoCodePage');
  }


  getPromoCode(){
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');



    //depends on message!
    //expired ye3ml 7aga
    //not available ye3ml 7aga
    //available.. push wkda!!

    this.url = "http://146.185.148.66:2300/checkPromotion/" + this.promoInput;

    this.http.get(this.url, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);

      //this.navCtrl.push(BasketPage, this.promoValue);
      if(data["_body"] == "Sorry , Code expired"){
        if(this.currentLanguage == "en"){
          this.customAlert("Error", "Promocode Expired", "Close");
        }else if(this.currentLanguage =="ar"){
          this.customAlert("أغلق", "بروموكود منتهية الصلاحية", "خطأ");
        }
      }else if(data["_body"] = null){
        if(this.currentLanguage == "en"){
          this.customAlert("Error", "Invalid Promocode", "Close");
        }else if(this.currentLanguage =="ar"){
          this.customAlert("خطأ", "بروموكود غير صحيح", "أغلق");
        }
      }else{
        //  this.promoMessage = "Promotion Added!";
        if(this.currentLanguage == "en"){
          this.customAlert("Done", "Promocode Added", "Close");
        }else if(this.currentLanguage =="ar"){
          this.customAlert("نجاح", "تمت إضافة بروموكود", "أغلق");
        }
          this.promoInput = "";
          this.promoValue = JSON.parse(data["_body"]);
          console.log(data["_body"]);
      }

    //  this.navCtrl.push(TrackOrderPage, this.orderData);
    }, err => {
      if(this.currentLanguage == "en"){
        this.customAlert("Error", "Invalid Promocode", "Close");
      }else if(this.currentLanguage =="ar"){
        this.customAlert("خطأ", "بروموكود غير صحيح", "أغلق");
      }
      console.log(err);
    });
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

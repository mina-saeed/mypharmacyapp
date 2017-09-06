import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the MedicinesListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-medicines-list',
  templateUrl: 'medicines-list.html',
})
export class MedicinesListPage {
  url:string;
  id:any;
  name:any;
  subProdcuts: any;
    zeroArr:boolean;

    private translate: TranslateService;
    currentLanguage:string;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams,public http:Http) {


          this.translate=translate;
        if (this.translate.currentLang =='ar') {
          this.currentLanguage = "ar";
        }
        else {
          this.currentLanguage = "en";
        }

    this.url = 'http://146.185.148.66:3003/';
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.zeroArr = true;
    this.getMedicinesOrProducts(this.id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicinesListPage');
  }

  getMedicinesOrProducts(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    this.url = 'http://146.185.148.66:3007/';

    this.http.get(this.url + 'subProducts/' + id, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);
      this.subProdcuts = JSON.parse(data["_body"]);
      this.zeroArr = this.checkLength(this.subProdcuts);
    //  console.log(this.subProdcuts);
    }, err => {
      console.log(err);
    });

  }
  checkLength(arr){
    if(arr.length == 0)
    {
      return true;
    }else{
      return false;
    }
  }
    goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); 
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }

}

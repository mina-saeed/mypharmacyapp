import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import { MedicinesListPage } from '../medicines-list/medicines-list';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the SubCategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sub-categories',
  templateUrl: 'sub-categories.html',
})
export class SubCategoriesPage {

  subCategories:any;
  url:string;
  id:any;
  zeroArr:boolean;

  currentLanguage:string;
  private translate: TranslateService;
  imageURL:any;
  constructor(translate: TranslateService, public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.translate=translate;
  if (this.translate.currentLang =='ar') {
    this.currentLanguage = "ar";
  }
  else {
    this.currentLanguage = "en";
  }


      this.url = 'http://146.185.148.66:3003/';
      this.id = this.navParams.get("id");
      this.imageURL = this.navParams.get("image");
      this.zeroArr = true;
      this.getSubCategories(this.id);
      console.log(this.subCategories);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCategoriesPage');
  }
  getSubCategories(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    this.url = 'http://146.185.148.66:3007/';

    this.http.get(this.url + 'allSubCategories/' + id, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);
      this.subCategories = JSON.parse(data["_body"]);
      this.zeroArr = this.checkLength(this.subCategories);
      console.log(this.subCategories);
    }, err => {
      console.log(err);
    });

  }
  goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); //kda hatly el default!! hwa ma3mlsh select
  }
    goMenu(){
    this.navCtrl.push(MenuPage);
  }
  goToMedicines(id, name){
    this.navCtrl.push(MedicinesListPage, {id: id, name: name});
  }
  checkLength(arr){
    if(arr.length == 0)
    {
      return true;
    }else{
      return false;
    }
  }

}

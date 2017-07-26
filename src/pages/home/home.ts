import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { BasketPage } from '../basket/basket';
import { availableLanguages, sysOptions } from '../welcome/welcome.constants';
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';
import { TestStorageProvider } from '../../app/test-storage';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  orderTest= {  //change default data according to mahmoud, or figure out a better way of doing deault ad empty values

    data: [

    {id:-1, name:"", description:"", category:"", barcode:-1, milligrams:0, price:0},


  ]};

  public showSearchResult: boolean;
  public showPage: boolean;
  url:string;

  private translate: TranslateService;
  constructor(translate: TranslateService,public lang: TestStorageProvider, public navCtrl: NavController,  public http:Http) {
    this.translate = translate;

    this.showSearchResult = false;  //initialise things to be visible
    this.showPage = true;
    this.url = 'http://146.185.148.66:3003/';
}
  /*applyLanguage() {
    this.translate.use(this.selectedLanguage);
  }*/

  goCamera(){
          if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }
    this.navCtrl.push(CameraPage);
  }
  goBasket(){
          if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }
    this.navCtrl.push(BasketPage);
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
          this.orderTest["data"] = [{id:-1, name:"No results found", description:"", category:"", barcode:-1, milligrams:0, price:0}]; //empty ot message
        }else{
          this.orderTest["data"] = JSON.parse(data["_body"].toString());
        }
        console.log(data);
      });

    console.log(ev.target.value);
    console.log(this.orderTest["data"][0]["name"]);
    //this.orderTest["data"].pop();
  }
  onCancelByName(ev){
    this.showSearchResult = false; //and true to show other components
    this.showPage = true;
  }


  setGetHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    return headers;
  }

}

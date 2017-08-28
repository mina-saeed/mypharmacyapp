import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { DetailedProductPage } from '../detailed-product/detailed-product';

/**
 * Generated class for the IlnessListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ilness-list',
  templateUrl: 'ilness-list.html',
})
export class IlnessListPage {

  url:string;
  id:any;
  medicines: any;
    zeroArr:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {

    this.url = 'http://146.185.148.66:3003/';
    this.id = this.navParams.data;
    this.zeroArr = true;
    this.getMedicinesOrProducts(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IlnessListPage');
  }
  getMedicinesOrProducts(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');



    this.http.get(this.url + 'search/category/' + id, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);
      this.medicines = JSON.parse(data["_body"]);
      this.zeroArr = this.checkLength(this.medicines);
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
  detailedProduct(id){

    this.url = 'http://146.185.148.66:3003/';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    this.http.get(this.url + 'searchID/'+id, new RequestOptions({headers:headers}))
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

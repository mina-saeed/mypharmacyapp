import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {

  url:string;
  rate = {
      userID: 0,
      pharmacyID: 0,
      rate: 5
    }
  report = {
      userID: 0,
      pharmacyID: 0,
      report: "Report!"
    }
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.url = 'http://146.185.148.66:3000/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatePage');

  }

  ratePharmacy(){
    let body = {

      userID: this.rate.userID,
      pharmacyID: this.rate.pharmacyID,
      rate:  this.rate.rate

    };



    this.http.post(this.url + 'addRating', body, new RequestOptions({headers: this.setGetHeaders()}))
    .map(res => res).subscribe(data => {
        console.log(data);
        console.log("yey no error");

    }, err =>{
      console.log("error:", err);
    });
  }


  reportPharmacy(){
    let body = {

      userID: this.report.userID,
      pharmacyID: this.report.pharmacyID,
      report: this.report.report

    };

    console.log(body);

    this.http.post(this.url + 'reportPharmacy', body, new RequestOptions({headers: this.setGetHeaders()}))
    .map(res => res).subscribe(data => {
      //  console.log(data);
        console.log("yey no error");

    },err =>{
      console.log("error:", err);
    });
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

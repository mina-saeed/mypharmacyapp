import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SearchTestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-test',
  templateUrl: 'search-test.html',
})
export class SearchTestPage {

  public showList: boolean;

  orderTest= {  //change default data according to mahmoud, or figure out a better way of doing deault ad empty values

    data: [

    {id:-1, name:"", description:"", category:"", barcode:-1, milligrams:0, price:0},


  ]};
  url:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
      this.showList = false;  //initialise things to be visible
      this.url = 'http://146.185.148.66:3003/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTestPage');
  }
  searchByName(ev) {
  /*  this.http.get(this.url + 'search/' + ev.target.value.toString(), new RequestOptions({headers: this.setGetHeaders()}))
    .map(res => res).subscribe(data => {
    //  alert(ev.target.value.toString());  //just for testing
    console.log(this.url + 'search/' + ev.target.value.toString());
      alert(data);  //just for testing
      console.log(data);
    });*/
  }
  updateListByName(ev) {

    this.showList = true; //when start searching, show the list
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
    this.showList = false; //and true to show other components
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

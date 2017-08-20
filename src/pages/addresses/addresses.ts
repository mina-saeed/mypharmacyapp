import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AddressesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addresses',
  templateUrl: 'addresses.html',
})
export class AddressesPage {

  url:string;
  addresses=[];
  email: any;

  userData = {
    //  name: "",
      email: "",
      address: "",
  //    token: "",
    }

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.url = 'http://146.185.148.66:3000/';
    this.email = "mail@mail.com";  //let it dynamic later!

  }

  ionViewDidLoad() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

    this.http.get(this.url + 'userAddress/' + this.email, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);
      this.addresses.push(JSON.parse(data["_body"]));
      //this.addresses =JSON.parse(data["_body"]);
      console.log(this.addresses);
    }, err => {
      console.log(err);
    });
  }
  addAddress(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


    //add more, eli homa device id w kol 7aga
    let body = {
    //  name: this.userData.name,
      email: this.email,
      address: this.userData.address,
    };



      this.http.post(this.url + 'user/address', body, new RequestOptions({headers:headers}))
      .map(res => res).subscribe(data => {

        console.log(data);
        alert(data["_body"]);

      }, err =>{
        console.log(err);
        alert(err["_body"]);
      });
    }
}

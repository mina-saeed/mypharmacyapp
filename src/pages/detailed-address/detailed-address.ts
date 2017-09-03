import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the DetailedAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detailed-address',
  templateUrl: 'detailed-address.html',
})
export class DetailedAddressPage {
  url:string;
  addresses=[

  ];
  email: any;

  currentAddress:string;
  userData = {

      email: "",
      address: "",

    }
    index:number;
  constructor(private alertCtrl: AlertController,public http:Http, public navCtrl: NavController, public navParams: NavParams) {
    this.url = 'http://146.185.148.66:3000/';
    this.addresses = this.navParams.get('addresses');
    this.userData = this.navParams.get('userData');
    this.index = this.navParams.get('index');
    this.currentAddress = this.addresses[this.index];
    console.log(this.currentAddress);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedAddressPage');

  }

  saveAddress(){
    this.navCtrl.pop();
  }
  deleteAddress()
  {

    this.addresses.splice(this.index, 1);
    console.log(this.addresses);
    this.updateAddressesToDB();
    this.navCtrl.pop();
  }
  saveAddresses(elem){
    //let x = this.addresses.indexOf(elem);
    //this.addresses[x]=this.userData.address;
    //this.editAddresses(); //go back

    this.addresses[this.index] = this.currentAddress;
    this.updateAddressesToDB();
    this.navCtrl.pop();
  }
  updateAddressesToDB(){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
        headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


        //add more, eli homa device id w kol 7aga
        let body = {
        //  name: this.userData.name,
          email: this.userData.email,
          address: this.addresses
        };



          this.http.post(this.url + 'user/address', body, new RequestOptions({headers:headers}))
          .map(res => res).subscribe(data => {

            console.log(data);
          //  alert(data["_body"]);

          }, err =>{
            console.log(err);
            //alert(err["_body"]);
          });
  }

}

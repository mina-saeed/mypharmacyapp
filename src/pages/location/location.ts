import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  url:string;
  deviceID:string;

  loc = {
      deviceID: "",
      location: {
        city: "",
        location: "",
        street: '',
        App_no: "",
        floor: "",
      },
      telephone: "",
      mobile: ""
    }

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,
              private uniqueDeviceID: UniqueDeviceID) {
                this.url = 'http://207.154.240.16:3000/';
                this.uniqueDeviceID.get()
              .then((uuid: any) => this.deviceID = uuid)
              .catch((error: any) => console.log(error));

  }

  ionViewDidLoad() {
    //naddaf el file

    console.log('ionViewDidLoad LocationPage');

    //********** CODE SNIPPER, when loading this page check if device id is registered!

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');
    //add more, eli homa device id w kol 7aga
  //  let body = new FormData();
  //  body.append("deviceID", "50");

    this.http.get(this.url + 'userHome/50', new RequestOptions({headers:headers}))
    .map(res => res.json()).subscribe(data => {
      alert(data); //jason return, if data returned go to order page, else go to login as guest
                    //the form is post request, like the old code with body.. this one needs no body
      console.log(data)
    });
  }


  locationSubmit(){


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


    //add more, eli homa device id w kol 7aga
    let body = {
      //deviceID: this.deviceID,   //if device!
      deviceID: 50,
      location: {
        city: this.loc.location.city,
        location: this.loc.location.location,
        street: this.loc.location.street,
        App_no: this.loc.location.App_no,
        floor: this.loc.location.floor

      },
      telephone: this.loc.telephone,
      mobile: this.loc.mobile
    };



    this.http.post(this.url + 'user/submit', JSON.stringify(body), new RequestOptions({headers:headers}))
    .map(res => res.json()).subscribe(data => {
      alert('LOG: ' +data);

      console.log(data)
    });

    //just to test
  //  alert(this.deviceID);
  /*console.log(this.url);
    console.log(JSON.stringify(body));
    console.log(JSON.stringify(this.loc.location.city));
    console.log(body);*/

  }
}

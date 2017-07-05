import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { TabsPage } from '../tabs/tabs';
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
    .map(res => res).subscribe(data => {

      //so: res==respond... if res lwa7daha then the respond is respond!, if res.json() then respond is [OBJECT]
      // SO USE RES only without json() to treat it like in update location page, and get data from it

      alert('LOG: ' +data);

      //code snippet, get status code, anything from response
      let obj = JSON.parse(JSON.stringify(data)); //now this is in console type OBJECT
      console.log(obj["_body"]);
      var bodyArray = obj["_body"].split(',');
      console.log(bodyArray[1]); //got deviceID, just an exmaple


    });

    this.navCtrl.push(TabsPage); //to test, change it accordingly
    //just to test
  //  alert(this.deviceID);
  /*console.log(this.url);
    console.log(JSON.stringify(body));
    console.log(JSON.stringify(this.loc.location.city));
    console.log(body);*/

  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the UpdateLocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-location',
  templateUrl: 'update-location.html',
})
export class UpdateLocationPage {

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

    constructor(public navCtrl: NavController, public navParams: NavParams,
      private uniqueDeviceID: UniqueDeviceID, public http:Http) {

        this.url = 'http://207.154.240.16:3000/';
        this.uniqueDeviceID.get()
        .then((uuid: any) => this.deviceID = uuid)
        .catch((error: any) => console.log(error));
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateLocationPage');
  }

  updateLocationSubmit(){

    console.log('updateloc');

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
          mobile: this.loc.mobile
    };

    this.http.post(this.url + 'user/editLocation', JSON.stringify(body), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      alert(data);

      console.log(data);

      //code snippet, get status code, anything from response
      let obj = JSON.parse(JSON.stringify(data)); //now this is in console type OBJECT
      console.log(obj["_body"]);
      console.log(obj["status"]);
      
    });


  }

}

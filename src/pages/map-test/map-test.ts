import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Geolocation  } from '@ionic-native/geolocation';
import {  GeocoderRequest } from 'ionic-native';

/**
 * Generated class for the MapTestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map-test',
  templateUrl: 'map-test.html',
})
export class MapTestPage {

  url:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,  public http:Http) {

    this.url = 'http://146.185.148.66:3000/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapTestPage');
  }

  testMap(){
            this.geolocation.getCurrentPosition().then((resp) => {

              this.reverseGeoLocation(resp.coords.latitude,resp.coords.longitude);


        }).catch((error) => {
          console.log('Error getting location', error);
        });
  }

  reverseGeoLocation(lat, long){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+',' + long, new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      let jsonResults = JSON.parse(data["_body"]);

      console.log(jsonResults["results"][1]);
      //jsonResults["results"]
      //jsonResults["results"][1]


      //documentation
      //now jsonResults["results"] contains array of objects (see log for details and more options)
      //element jsonResults["results"][1] is the most accurate location



    }, err =>{
      console.log(err);
      alert(err);
    });
  }
}

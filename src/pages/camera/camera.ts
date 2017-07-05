import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

    //**** NO ERROR HANDLING DONE

    public photos: any;
    public base64Image: string;
           url:string;
    //options: BarcodeScannerOptions;

    constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
        private alertCtrl: AlertController,
        private barcodeScanner: BarcodeScanner,
        private imagePicker: ImagePicker,
        public http:Http) {

          this.url = 'http://207.154.240.16:3003/';
        }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CameraPage');
    }

    ngOnInit() {
        this.photos = [];
    }
    takePhoto() {
        const options: CameraOptions = {
            quality: 50, //original 100!
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {

            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.photos.push(this.base64Image);
            this.photos.reverse();
        }, (err) => {
            // Handle error
        });
    }
    pickPhoto() {


      let options = {
        maximumImagesCount: 3, //how many pictures to pick??!
        width: 300,
        height: 300,
        quality : 75
      };

      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.base64Image = results[i];
          this.photos.push(this.base64Image);
          this.photos.reverse();
        }
      }, (err) => { });



    }
    scanBarcode() {



       this.barcodeScanner.scan().then((barcodeData) => {
            // Success! Barcode data is here
            //alert(barcodeData.text);
            this.http.get(this.url + 'search/barcode/'+ barcodeData.text, new RequestOptions({headers: this.setGetHeaders()}))
            .map(res => res).subscribe(data => {
              alert(barcodeData.text);
              console.log(data);
            });
        }, (err) => {
            // An error occurred
            alert("Cannot scan barcodes");
        });
    }
    deletePhoto(index) {

        /*  let confirm = this.alertCtrl.create({
           title: 'Delete Photo?',
           message: 'Do you want to delete this picture? ',
           buttons: [
             {
               text: 'No',
               handler: () => {
              //   console.log('No');
               }
             },
             {
               text: 'Yes',
               handler: () => {
                 this.photos.splice(index,1);
               }
             }
           ]
         });
         confirm.present();
         }*/
        this.photos.splice(index, 1);
    }

    setGetHeaders(){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

      return headers;
    }


    searchByCategory(ev) {

      this.http.get(this.url + 'search/category/'+ ev.target.value.toString(), new RequestOptions({headers: this.setGetHeaders()}))
      .map(res => res).subscribe(data => {
      //  alert(ev.target.value.toString());  //just for testing
        alert(data);  //just for testing
        console.log(data);
      });
    }
    searchByName(ev) {
      this.http.get(this.url + 'search/' + ev.target.value.toString(), new RequestOptions({headers: this.setGetHeaders()}))
      .map(res => res).subscribe(data => {
      //  alert(ev.target.value.toString());  //just for testing
        alert(data);  //just for testing
        console.log(data);
      });
    }






}

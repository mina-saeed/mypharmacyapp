import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TestStorageProvider } from '../../app/test-storage';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { NativeStorage } from '@ionic-native/native-storage';

import { DetailedProductPage } from '../detailed-product/detailed-product';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';

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


    orderTest= {

      data: [

      {id:1, name:"Medicine1", price:4, qty:3},

      {id:2, name:"Medicine2", price:5, qty:5},

      {id:3, name:"Medicine3", price:2, qty:1},

    ]};

    currentImageMessage: string;


    public photos: any;
    public base64Image: string;
           url:string;
    //options: BarcodeScannerOptions;
    private translate: TranslateService;
    constructor(translate: TranslateService, public navCtrl: NavController, public lang: TestStorageProvider,public navParams: NavParams, private camera: Camera,
        private alertCtrl: AlertController,
        private barcodeScanner: BarcodeScanner,
        private imagePicker: ImagePicker,
        public http:Http,
        private transfer: FileTransfer,
      private nativeStorage: NativeStorage) {
          this.translate = translate;
          //this.url = 'http://207.154.240.16:3003/';
          this.url = 'http://146.185.148.66:3003/';
          this.getOrder();
          this.currentImageMessage = "No prescription uploaded!";
          console.log(this.translate.currentLang =='en');
          if (this.translate.currentLang =='en') {
            this.currentImageMessage = "No prescription uploaded!";
          }
          else {
        this.currentImageMessage = "لم يتم تحميل أي وصفة طبية";
          }
        }


    ionViewDidLoad() {
        console.log('ionViewDidLoad CameraPage');
    }

    ngOnInit() {
        this.photos = [];
    }
    takePhoto() {
        const options: CameraOptions = {
            quality: 100, //original 100!
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true
        }

        this.camera.getPicture(options).then((imageData) => {

            this.base64Image = 'data:image/jpeg;base64,' + imageData;
          //  this.currentImageMessage = "A prescription inserted from camera!"
          console.log(  this.base64Image);

          this.orderTest["prescription"] = this.base64Image;
          if (this.translate.currentLang =='en') {
            this.currentImageMessage = "A prescription inserted from camera!";
          }
          else {
          this.currentImageMessage = "تم تحميل وصفة طبية";
          this.nativeStorage.setItem('order', this.orderTest);
          }
        }, (err) => {
            // Handle error
        });
    }
    pickPhoto() {


      let options = {
        maximumImagesCount: 1, //how many pictures to pick??!
        width: 300,
        height: 300,
        quality : 75
      };

      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.base64Image = results[i];
          console.log('Image URI: ' + results[i]);
          this.orderTest["prescription"] = results[i];
          console.log(this.base64Image);
          //this.currentImageMessage = "A prescription inserted from gallery!";
          if (this.translate.currentLang =='en') {
            this.currentImageMessage = "A prescription inserted from gallery!";
          }
          else {
          this.currentImageMessage = "تم تحميل وصفة طبية";
          }
          this.nativeStorage.setItem('order', this.orderTest);
        //  this.photos.push(this.base64Image);
        //  this.photos.reverse();
        }
      }, (err) => { });



    }
    scanBarcode() {



       this.barcodeScanner.scan().then((barcodeData) => {
            // Success! Barcode data is here
            //alert(barcodeData.text);

            //  alert(barcodeData.text);

            this.http.get(this.url + 'searchBarcode/' + barcodeData.text, new RequestOptions({headers: this.setGetHeaders()}))
            .map(res => res).subscribe(pdata => {
                console.log(pdata);
              //  console.log("yey no error", pdata);
              //the error depends on mahmoud result, error in response wala body fih no results
                if(pdata["_body"] == "No medicines match this barcode" || pdata["_body"] == "sorry , no results match this barcode"){
                  alert("Invalid barcode!")
                }else{
                  console.log(JSON.parse(pdata["_body"]));
                  this.navCtrl.push(DetailedProductPage, {_body: pdata["_body"]});
                }

            },err =>{
              //alert("Invalid barcode!");
              if (this.translate.currentLang =='en') {
                alert("Invalid barcode!");
              }
              else {
              alert("الباركود غير صحيحة");
            }
            });


        }, (err) => {
            // An error occurred
            console.log(this.translate.currentLang =='en');
            if (this.translate.currentLang =='en') {
              alert("Cannot scan barcodes");
            }
            else {
            alert("لا يستطيع مسح الباركود");
            }
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

    updateListByName(ev) {
      console.log(ev.target.value);
      console.log(this.orderTest["data"][0]["name"]);
    }


     getOrder(){ //get from local sotrage
            this.nativeStorage.getItem('order')
           .then(data =>{
                     console.log(data);
                     this.orderTest = data;
                     //console.log("got data 5alas: ",data);
                     //alert(data);
                     } ,
             error => {
               console.log("Error getting orders!");
             }
           );
     }
     customAlert(title, message, buttonText){
       let alert = this.alertCtrl.create({
           title: title,
           message: message,
           buttons: [
             {
               text: buttonText,

             }
           ]
         });
         alert.present();
     }

}

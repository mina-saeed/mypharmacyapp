import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { TranslateService } from 'ng2-translate';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import { TestStorageProvider } from '../../app/test-storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { NativeStorage } from '@ionic-native/native-storage';

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
    postList;
    getPosts(){
        this.remoteService.getPosts().subscribe((data)=>{
            this.postList = data;
        });
    }
    selectedCity="";
    selectedLocation="";
    selected;
  validations_form: FormGroup;
 /* languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;

  param = { value: 'world' };
  public var validation_messages;
  private translate: TranslateService;
  */
  url:string;
  deviceID:string;
  public msg: string;
  loc = {
      deviceID: "",
      location: {
        city: "",
        location: "",
        street: '',
        building:'',
        App_no: "",
        floor: "",
      },
      telephone: "",
      mobile: ""
    }
  private translate: TranslateService;
  x ={value: ""}

  validation_messages = {
    'city':[
    {type:'required',message:''}
    ],
    'location':[
    {type:'required',message:''}
    ],
    'street': [
      { type: 'required', message: '' }
    ],
    'building': [
      { type: 'required', message: '' }
    ],
    'app': [
      { type: 'required', message: 'Apartment is required' }
    ],
    'floor': [
      { type: 'required', message: 'Floor is required' }
    ],
    'mobile': [
      { type: 'required', message: '' },
      { type: 'minlength', message: '' },
      { type: 'pattern', message: '' }
    ],
    };

  constructor( private nativeStorage: NativeStorage, private selector: WheelSelector,private remoteService : RemoteServiceProvider, translate: TranslateService, public lang: TestStorageProvider,public navCtrl: NavController, public navParams: NavParams, public http:Http,
              private uniqueDeviceID: UniqueDeviceID,public formBuilder: FormBuilder) {
                this.translate = translate;

           this.translate.get('CITYVAL').subscribe((result: string) => {
                this.validation_messages.city[0].message = result;
          });
        this.translate.get('LOCATIONVAL').subscribe((result: string) => {
                this.validation_messages.location[0].message = result;
          });
                this.translate.get('STREETVAL').subscribe((result: string) => {
                this.validation_messages.street[0].message = result;
                });
                this.translate.get('BUILDINGVAL').subscribe((result: string) => {
                this.validation_messages.building[0].message = result;
                });
                this.translate.get('APPVAL').subscribe((result: string) => {
                this.validation_messages.app[0].message = result;
                });
                this.translate.get('FLOORVAL').subscribe((result: string) => {
                this.validation_messages.floor[0].message = result;
                });
                this.translate.get('MOBILEVAL0').subscribe((result: string) => {
                this.validation_messages.mobile[0].message = result;
                });
                this.translate.get('MOBILEVAL1').subscribe((result: string) => {
                this.validation_messages.mobile[1].message = result;
                });
               this.translate.get('MOBILEVAL2').subscribe((result: string) => {
                this.validation_messages.mobile[2].message = result;
                });
                this.url = 'http://146.185.148.66:3000/';
                this.uniqueDeviceID.get()
              .then((uuid: any) => this.deviceID = uuid)
              .catch((error: any) => console.log(error));
     this.validations_form = this.formBuilder.group({
      city: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      building: new FormControl('', Validators.required),
      app: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      tel: [''],
      mobile: new FormControl('', Validators.compose([
        Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0]{1}[1]{1}[0-2]{1}[0-9]{8}')]))
});


//alert(Object.keys(this.x));
/* this.translate.get("MEDICINE").subscribe({
  (value: [string]) => {
    let this.x = value;
  }
}); */
//alert(JSON.stringify(this.x.value));
}
  
  selectCity() {
   this.getPosts();
   this.selector.show({
     title: "City",
     items: [
       this.postList.cities
     ],displayKey: 'name',
   }).then(
     result => {
       console.log(result[0].name);
       this.selectedCity = result[0].name;
     },
     err => console.log('Error: ', err)
     );

 }
   selectLocation() {
   if(!this.selectedCity){
   alert(" please select your City first ");
   }
   else {
   this.getPosts();
   //alert(this.selectedCity.replace(/\s+/g, '') +"List");
   let city=this.selectedCity.replace(/\s+/g, '')+"List";
   this.selected=eval('this.postList'+'.'+city);
   //alert(this.selected);
   //location = this.selectedCity | lowercase +"List";
   this.selector.show({
     title: "Location",
     items: [
      this.selected
     ],displayKey: 'name',
   }).then(
     result => {
       console.log(result[0].name);
       this.selectedLocation = result[0].name;
     },
     err => console.log('Error: ', err)
     );
}
 }
/*
  applyLanguage() {
    this.translate.use(this.selectedLanguage);

  }
*/
  ionViewDidLoad() {
    //alert("xxxx"+this.x.value);
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
      deviceID: this.deviceID,
      location: {
        city: this.loc.location.city,
        location: this.loc.location.location,
        street: this.loc.location.street,
        building: this.loc.location.building,
        App_no: this.loc.location.App_no,
        floor: this.loc.location.floor

      },
      tel: this.loc.telephone,
      mobile: this.loc.mobile
    };



    this.http.post(this.url + 'user/submit', JSON.stringify(body), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {

      //so: res==respond... if res lwa7daha then the respond is respond!, if res.json() then respond is [OBJECT]
      // SO USE RES only without json() to treat it like in update location page, and get data from it

      //alert('LOG: ' +data);

      //code snippet, get status code, anything from response
      let obj = JSON.parse(JSON.stringify(data)); //now this is in console type OBJECT
      console.log(obj["_body"]);
      var bodyArray = obj["_body"].split(',');
      console.log(bodyArray[1]); //got deviceID, just an exmaple


    });
            if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }


        this.nativeStorage.setItem('rememberUser', body)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    this.navCtrl.setRoot(TabsPage); //to test, change it accordingly
    //just to test
  //  alert(this.deviceID);
  /*console.log(this.url);
    console.log(JSON.stringify(body));
    console.log(JSON.stringify(this.loc.location.city));
    console.log(body);*/

  }
}

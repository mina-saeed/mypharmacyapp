import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { WheelSelector } from '@ionic-native/wheel-selector';
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
  url:string;
  deviceID:string;

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
    constructor(private selector: WheelSelector,private remoteService : RemoteServiceProvider,translate: TranslateService, public navCtrl: NavController, public navParams: NavParams,
      private uniqueDeviceID: UniqueDeviceID, public http:Http,public formBuilder: FormBuilder) {
        this.translate=translate;
       // this.translate.use('en');
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
        building: this.loc.location.street,
        App_no: this.loc.location.App_no,
        floor: this.loc.location.floor

      },
        telephone: this.loc.telephone,
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

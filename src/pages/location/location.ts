import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { TranslateService } from 'ng2-translate';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import { TestStorageProvider } from '../../app/test-storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';

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

    currentLanguage: string;
  constructor(private geolocation: Geolocation, private alertCtrl: AlertController, private nativeStorage: NativeStorage, private selector: WheelSelector,private remoteService : RemoteServiceProvider, translate: TranslateService, public lang: TestStorageProvider,public navCtrl: NavController, public navParams: NavParams, public http:Http,
              private uniqueDeviceID: UniqueDeviceID,public formBuilder: FormBuilder) {

                this.translate=translate;
              if (this.translate.currentLang =='ar') {
                this.currentLanguage = "ar";
              }
              else {
                this.currentLanguage = "en";
              }

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
     if(this.currentLanguage == "en"){
       this.customAlert("Error", "Please select the city first", "Close");
     }else if(this.currentLanguage =="ar"){
      this.customAlert("أغلق", "يرجى تحديد المدينة أولا", "خطأ");
     }
   }
   else {
   this.getPosts();
   //alert(this.selectedCity.replace(/\s+/g, '') +"List");
   let city=this.selectedCity.replace(/\s+/g, '')+"";
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

    let name = "Guest";
    if(this.navParams.data == 1){
        name = "Guest";
    }else{
        name = this.navParams.data;
    }
    //add more, eli homa device id w kol 7aga
    let body = {
      //deviceID: this.deviceID,   //if device!
      name: name,
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

console.log("bnaaaame", body.name)

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


  ////
  allLocations:any; //from json, represents the whole json
  allCities:any;  //from json
  allAreasInCity:any; //from json
  currentCity:any;  //from map
  currentAreas:any;  //from map
  chosenArea:any;  //from dropdown list
  stop = false;


  getLocation(){  //from button
    this.getDetailedLocation();
  }
  compareAreas(area){
    for(var x = 0; x < this.allAreasInCity.length; x++){
      //console.log(this.CalculateSimilarity(city,this.allCities[x]));
      if((this.CalculateSimilarity(area,this.allAreasInCity[x]["name"])*100) > 60){
        console.log("similar area:", area, this.allAreasInCity[x]);
        //do something, put this in textbox!!
        //put ours in json
        return true;
      }
    }
    //add the area in the json file!!!!!!!
    this.allLocations[this.currentCity].push({name: area});
    console.log("no similar area");
    return false;
  }
  getAllAreasInCity(city){

    if(this.compareCities(city) == true){
      console.log(this.allLocations)
      console.log(this.allLocations[city]);
      this.allAreasInCity = this.allLocations[city];
    }else{
      console.log("Unknown Location, NOT in egypt");
      alert("Unknown Location, NOT in egypt");
      ///must break matkamlsh asln
      this.stop = true;
    }

  }

  compareCities(city){
    for(var x = 0; x < this.allCities.length; x++){
      //console.log(this.CalculateSimilarity(city,this.allCities[x]));
      if((this.CalculateSimilarity(city,this.allCities[x])*100) > 60){
        console.log("similar city:", city, this.allCities[x]);
        //do something, put this in textbox!!
        //put ours in json
        return true;
      }
    }

  }

  async fetchCities(arr){
    let newArr = [];
    for(var x = 0; x < arr.length; x++){
      newArr.push(arr[x]["name"]);
    }
    this.allCities = newArr;

    //this is the last step, so now get all areas in city,
    //then show the list to chose then compare, if yes add if not dont add kda..
    //json not on internet yet

    await this.getAllAreasInCity(this.currentCity);

    if(this.stop == false){
      //list shown here, put result in chosen area!!
      let alert = this.alertCtrl.create();
           alert.setTitle('Choose Area');

           console.log(this.currentAreas);
           for(var x = 0; x < this.currentAreas.length; x ++){
             alert.addInput({
               type: 'radio',
               label: this.currentAreas[x],
               value: this.currentAreas[x],
               //checked: true
             });
           }


           alert.addButton('Cancel');
           alert.addButton({
             text: 'OK',
             handler: data => {
               //this.testRadioOpen = false;
               this.chosenArea = data;

               //after chosing, do this
               this.compareAreas(this.chosenArea);

               //ngModel, put all data in textboxes
               this.loc.location.city = this.currentCity;
               this.selectedCity = this.currentCity; //for validation_messages

               this.loc.location.location = this.chosenArea;
               this.selectLocation = this.chosenArea;


               //to test
               //console.log(this.allLocations);


               //update the json file with this data: this.allLocations !!!!!
               //--- please update the file with this data: this.allLocations

             }
           });
           alert.present();
    }


  }
  getSettingsJSON(){
    let url = "settings.json";

    this.http.get(url, new RequestOptions())
    .map(res => res).subscribe(data =>{
    //  console.log(JSON.parse(data["_body"]));
      this.allLocations =  JSON.parse(data["_body"]);
      this.fetchCities(this.allLocations["cities"]);
    //  console.log(this.allCities);
    }, err =>{

    })
  }

  getDetailedLocation(){
          this.geolocation.getCurrentPosition().then((resp) => {

               console.log(resp.coords.longitude, resp.coords.latitude);

               this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ resp.coords.latitude + ',' + resp.coords.longitude + '&key=AIzaSyBk-czZcYlF1lmAnbsCuGou2WZnR1XLo5U', new RequestOptions())
               .map(res => res).subscribe(pdata => {
                 console.log(JSON.parse(pdata["_body"]));

                 this.getAreas(pdata);
                 console.log(this.currentAreas);
                 console.log(this.getCity(pdata));
                 this.getSettingsJSON();


               },err =>{
               console.log(err);
               });


      }).catch((error) => {
        console.log('Error getting location', error);
      });

  }
  removeGovernate(string):string{
    if(string.includes("Governorate")){
      var result = string.replace('Governorate','');
      //console.log(result.trim());
      return result.trim();  //remove unneccesary whitespaces
    }else{
      return string;
    }
  }

  getCity(responseFromMap){

  let arr = JSON.parse(responseFromMap["_body"])["results"][0]["address_components"];

    //console.log(arr[arr.length - 2]["long_name"].toString());
    var city = this.removeGovernate(arr[arr.length - 2]["long_name"].toString());
    this.currentCity = city;
    return city;
  }
  getAreas(responseFromMap){
    let arr = JSON.parse(responseFromMap["_body"])["results"][0]["address_components"];
    let newArr = [];
    for(var x = 0; x < arr.length - 2; x ++){
      if(isNaN(arr[x]["long_name"])){  //check if it is not a number to remove it
        if(arr[x]["long_name"] != "Unnamed Road"){
            newArr.push( arr[x]["long_name"]);
        }

      }

    }

    //remove duplicates
    var unique = newArr.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
    })
  //  console.log(newArr);
  this.currentAreas = newArr;
    //return newArr;
  }

 ComputeLevenshteinDistance(a: string, b: string): number
{
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0)
  {
    return bn;
  }
  if (bn === 0)
  {
    return an;
  }
  const matrix = new Array<number[]>(bn + 1);
  for (let i = 0; i <= bn; ++i)
  {
    let row = matrix[i] = new Array<number>(an + 1);
    row[0] = i;
  }
  const firstRow = matrix[0];
  for (let j = 1; j <= an; ++j)
  {
    firstRow[j] = j;
  }
  for (let i = 1; i <= bn; ++i)
  {
    for (let j = 1; j <= an; ++j)
    {
      if (b.charAt(i - 1) === a.charAt(j - 1))
      {
        matrix[i][j] = matrix[i - 1][j - 1];
      }
      else
      {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1], // substitution
          matrix[i][j - 1], // insertion
          matrix[i - 1][j] // deletion
        ) + 1;
      }
    }
  }
  return matrix[bn][an];
};
 CalculateSimilarity( source: string,  target: string) : number
{
    if ((source == null) || (target == null)) return 0.0;
    if ((source.length == 0) || (target.length == 0)) return 0.0;
    if (source == target) return 1.0;

    let stepsToSame = this.ComputeLevenshteinDistance(source, target);
    return (1.0 - (stepsToSame / Math.max(source.length, target.length)));
}



}

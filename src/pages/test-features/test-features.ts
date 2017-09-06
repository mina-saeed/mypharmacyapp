import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { DatePicker } from '@ionic-native/date-picker';
import { NativeStorage } from '@ionic-native/native-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the TestFeaturesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-test-features',
  templateUrl: 'test-features.html',
})
export class TestFeaturesPage {

    medicineID:any; //should be replaced when moved from test page
    maxReminderID = 0;
    schedules = [];
    chosenDate:Date;
    timePicked = false;
    currentSchedule = {
      scheduleID: 0,
      medicineID: '',
      medicineName: '',
      date: new Date(),
    }

    url:string;
    categories:any;
    currentLanguage: any;
    private translate: TranslateService;

    allLocations:any; //from json, represents the whole json
    allCities:any;  //from json
    allAreasInCity:any; //from json
    currentCity:any;  //from map
    currentAreas:any;  //from map
    chosenArea:any;  //from dropdown list

  constructor(private geolocation: Geolocation, private localNotifications: LocalNotifications, private nativeStorage: NativeStorage, private datePicker: DatePicker, translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public http:Http) {


      /*  this.translate = translate;
        if (this.translate.currentLang =='ar') {
          this.currentLanguage = "ar";
        }
        else {
          this.currentLanguage = "en";
        }*/

  //    console.log(this.ComputeLevenshteinDistance("Daniel", "Dani"));
    //  console.log(this.CalculateSimilarity("Saint Catherin", "Qesm Saint Katrin") *100);
  }

  ionViewDidLoad() {
  /*  this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ 28.485732 + ',' +  34.493300+ '&key=AIzaSyBk-czZcYlF1lmAnbsCuGou2WZnR1XLo5U', new RequestOptions())
    .map(res => res).subscribe(pdata => {
      //console.log(JSON.parse(pdata["_body"])["results"][0]["address_components"]);

   this.getAreas(pdata);
   console.log(this.currentAreas);
   console.log(this.getCity(pdata));
   this.getSettingsJSON();


    },err =>{
    console.log(err);
    });
*/
    this.getDetailedLocation();

  }

  compare(){
  //  this.compareCities("Al Fayoum");
  this.getAllAreasInCity(this.currentCity);
    this.compareAreas(this.chosenArea);
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
      console.log("Unknown Location, NOT in egypt")
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

  fetchCities(arr){
    let newArr = [];
    for(var x = 0; x < arr.length; x++){
      newArr.push(arr[x]["name"]);
    }
    this.allCities = newArr;
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

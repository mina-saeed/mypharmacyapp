import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { IlnessListPage } from '../ilness-list/ilness-list';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the IllnessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-illness',
  templateUrl: 'illness.html',
})
export class IllnessPage {

      url:string;
      illnesses:any;

      currentLanguage:string;
      private translate: TranslateService;

  constructor(translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.url = 'http://146.185.148.66:3006/';

    this.translate=translate;
  if (this.translate.currentLang =='ar') {
    this.currentLanguage = "ar";
  }
  else {
    this.currentLanguage = "en";
  }


    this.getIllness();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IllnessPage');
  }

  getIllness(){


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


    //port 3006
    this.http.get(this.url + 'all', new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(JSON.parse(data["_body"]));
     this.illnesses = JSON.parse(data["_body"]);

    }, err => {
      console.log(err);
    });

  }
  goToMedicines(id){
  console.log(id);
    this.navCtrl.push(IlnessListPage, id);
  }

}

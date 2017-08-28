import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';

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

    url:string;
    categories:any;
    currentLanguage: any;
    private translate: TranslateService;
  constructor(translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public http:Http) {

        this.url = 'http://146.185.148.66:3003/';
        this.translate = translate;
        if (this.translate.currentLang =='ar') {
          this.currentLanguage = "ar";
        }
        else {
          this.currentLanguage = "en";
        }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestFeaturesPage');


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


    //port 3003
    this.http.get(this.url + 'search/category/AsthmaR', new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      console.log(data);

    }, err => {
      console.log(err);
    });

  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { Globalization } from 'ionic-native';
import { defaultLanguage, availableLanguages, sysOptions } from '../welcome/welcome.constants';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { WelcomePage } from '../welcome/welcome';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { TestStorageProvider } from '../../app/test-storage';
import 'rxjs/add/operator/toPromise';

import { RegisterEmailPage } from '../register-email/register-email';
import { LoginEmailPage } from '../login-email/login-email';
/**
 * Generated class for the LanguagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {
  deviceID:string;
  languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;
  private translate: TranslateService;
  LANGUAGE = 'language';
  //storage: Storage;
  constructor(platform: Platform,translate: TranslateService,public lang: TestStorageProvider,  public navCtrl: NavController, public navParams: NavParams, private uniqueDeviceID: UniqueDeviceID) {
  this.translate = translate;
  platform.ready().then(() => {
           // this language will be used as a fallback when a translation isn't found in the current language
          translate.setDefaultLang(defaultLanguage);

          if ((<any>window).cordova) {

            Globalization.getPreferredLanguage().then(result => {
              var language = this.getSuitableLanguage(result.value);
              console.log(language);
              //alert(language);
              translate.use(language);
              sysOptions.systemLanguage = language;
            });
          } else {
            let browserLanguage = translate.getBrowserLang() || defaultLanguage;
            var language = this.getSuitableLanguage(browserLanguage);
            //alert(language);
            translate.use(language);
            sysOptions.systemLanguage = language;
          }
        }
      );

    }
   /*
  setLanguage(language: string): void {
    this.storage.set('language', language);
  };
*/
/*
  getLanguage(): string {
    return this.storage.get('language');
    };
   */
    getSuitableLanguage(language) {
      language = language.substring(0, 2).toLowerCase();
      return availableLanguages.some(x => x.code == language) ?  language : defaultLanguage;
    }


  applyLanguage(value) {
  	//alert(value);
  	//this.setLanguage(value);
    //this.setLanguage(value);
    //this.lang.save(value);
    this.translate.use(value);
    this.lang.save(value);
    //alert(this.lang);
    //alert(this.lang.load() == undefined);
    //this.lang.save(value).then(() => this.navCtrl.push('welcomePage'));
    //alert(this.lang.load());
   // alert(this.load());
 	//alert(this.storage.get('language'));
 	//alert(this.getLanguage());
    //this.translate.use(this.getLanguage());

 	  this.navCtrl.push(WelcomePage);
   	//this.navCtrl.push(RegisterEmailPage);
   }

  ionViewDidLoad() {
    this.lang.load();

    console.log('ionViewDidLoad LanguagePage');

}

}

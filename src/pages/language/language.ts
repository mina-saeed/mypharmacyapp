import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { Globalization } from '@ionic-native/globalization';
import { defaultLanguage, availableLanguages, sysOptions } from '../welcome/welcome.constants';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { WelcomePage } from '../welcome/welcome';
import { TabsPage } from '../tabs/tabs';
import { TestStorageProvider } from '../../app/test-storage';
import 'rxjs/add/operator/toPromise';
import { NativeStorage } from '@ionic-native/native-storage';
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
  constructor(private Globalization: Globalization, private nativeStorage: NativeStorage,platform: Platform,translate: TranslateService,public lang: TestStorageProvider,  public navCtrl: NavController, public navParams: NavParams, private uniqueDeviceID: UniqueDeviceID) {
  this.translate = translate;
  platform.ready().then(() => {
           // this language will be used as a fallback when a translation isn't found in the current language
          translate.setDefaultLang(defaultLanguage);

          if ((<any>window).cordova) {

            Globalization.getPreferredLanguage().then(result => {
              var language = this.getSuitableLanguage(result.value);
              console.log(language);
              //alert(language);
              if(this.navParams.data != 1){
                translate.use(language);
              }
              sysOptions.systemLanguage = language;
            });
          } else {
            let browserLanguage = translate.getBrowserLang() || defaultLanguage;
            var language = this.getSuitableLanguage(browserLanguage);
            //alert(language);
            if(this.navParams.data != 1){
              translate.use(language);
            }
            sysOptions.systemLanguage = language;
          }

        }
      );

    }
   /*
  setLanguage(language: string): void {
    //this.storage.set('language', language);
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


            this.nativeStorage.setItem('language', value)
        .then(
          () => console.log(value),
          error => console.error('Error storing item', error)
        );
     this.translate.use(value);
     if(this.navParams.data == 1){
       this.navCtrl.push(TabsPage);
     }else{
       this.navCtrl.push(WelcomePage);
     }

   }

  ionViewDidLoad() {
    this.lang.load();

    console.log('ionViewDidLoad LanguagePage');

}

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { Globalization } from 'ionic-native';
import { defaultLanguage, availableLanguages, sysOptions } from '../welcome/welcome.constants';

/**
 * Generated class for the TrackOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-track-order',
  templateUrl: 'track-order.html',
})
export class TrackOrderPage {
  private translate: TranslateService;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
  this.translate=translate;
  this.translate.use('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackOrderPage');
  }

}

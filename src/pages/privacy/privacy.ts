import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the PrivacyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
  private translate: TranslateService;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
     this.translate = translate;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPage');
  }

}

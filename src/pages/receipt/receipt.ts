import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the ReceiptPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
  private translate: TranslateService;

  constructor(translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
       this.translate = translate;
   	 this.translate.use('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

}

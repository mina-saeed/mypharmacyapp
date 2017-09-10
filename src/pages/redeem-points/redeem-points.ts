import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the RedeemPointsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-redeem-points',
  templateUrl: 'redeem-points.html',
})
export class RedeemPointsPage {
  private translate: TranslateService;
  name:any;
  constructor(translate: TranslateService,private nativeStorage: NativeStorage,public navCtrl: NavController, public navParams: NavParams) {
  this.translate = translate;
       ///////////////this.translate.use('ar');
           this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedeemPointsPage');
  }
    goBasket(){
    this.navCtrl.push(BasketPage);
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }
  getData(){
    this.nativeStorage.getItem('rememberUser')
    .then(
    data => {
      console.log(data["name"]);
    this.name = data["name"];},
    error => {  this.name =  "error"}
  );
  }
}

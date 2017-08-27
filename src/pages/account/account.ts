import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App} from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import { WelcomePage } from '../welcome/welcome';
import { NativeStorage } from '@ionic-native/native-storage';
import { OrderHistoryPage } from '../order-history/order-history';

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  private translate: TranslateService;

  constructor(private app: App,private nativeStorage: NativeStorage, translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
   this.translate = translate;
    //this.translate.use('en');
  }
  goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); //kda hatly el default!! hwa ma3mlsh select
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }

  logout(){

    this.nativeStorage.remove('rememberUser');
  //  this.navCtrl.push(WelcomePage);
    this.app.getRootNav().setRoot(WelcomePage);
  //  this.ionicBootstrap(MyApp,null, {tabsHideOnSubPages:"true"});
  }
  goToHistory(){
    this.navCtrl.push(OrderHistoryPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}

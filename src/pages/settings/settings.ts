import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, App} from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import {OnInit, ViewChild} from '@angular/core';
import { ReminderPage } from '../reminder/reminder';
import { LanguagePage } from '../language/language';


/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private translate: TranslateService;
  @ViewChild(Navbar) navBar:Navbar;

  constructor(private app: App, translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
     this.translate = translate;

  }
  goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); //kda hatly el default!! hwa ma3mlsh select
  }
    goMenu(){
    this.navCtrl.push(MenuPage);
  }
  goToReminderPage(){
    this.navCtrl.push(ReminderPage);
  }
  goToLanguage(){
    //this.navCtrl.push(LanguagePage, 1);
      this.app.getRootNav().push(LanguagePage, 1);
  }

      ionViewDidLoad() {
    /*    this.navBar.backButtonClick = (e:UIEvent) => {
            console.log("Back button clicked");
            this.navCtrl.parent.viewCtrl.dismiss();
         }; */
      }

}

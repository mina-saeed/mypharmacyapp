import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { BasketPage } from '../basket/basket';
import { availableLanguages, sysOptions } from '../welcome/welcome.constants';    
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';
import { TestStorageProvider } from '../../app/test-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  private translate: TranslateService;
  constructor(translate: TranslateService,public lang: TestStorageProvider, public navCtrl: NavController) {
    this.translate = translate;
}
  /*applyLanguage() {
    this.translate.use(this.selectedLanguage);
  }*/

  goCamera(){
          if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }
    this.navCtrl.push(CameraPage);
  }
  goBasket(){
          if(this.lang.load() !== undefined){
        this.translate.use(this.lang.load());
        }
    this.navCtrl.push(BasketPage);
  }
  openModal(){
    alert("This features has not been implemented yet!")
  }
}

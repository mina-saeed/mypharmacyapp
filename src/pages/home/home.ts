import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { BasketPage } from '../basket/basket';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {




  constructor(public navCtrl: NavController) {

  }
  goCamera(){
    this.navCtrl.push(CameraPage);
  }
  goBasket(){
    this.navCtrl.push(BasketPage);
  }
  openModal(){
    alert("This features has not been implemented yet!")
  }
}

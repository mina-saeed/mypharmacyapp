import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';


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
  openModal(){
    alert("This features has not been implemented yet!")
  }
}

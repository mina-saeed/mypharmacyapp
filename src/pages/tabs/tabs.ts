import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LocationPage } from '../location/location';
import { UpdateLocationPage } from '../update-location/update-location';
import { HomePage } from '../home/home';
import { CameraPage } from '../camera/camera';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  homePage = HomePage;
  locationPage = LocationPage;
  updateLocationPage = UpdateLocationPage;
  cameraPage = CameraPage;

}

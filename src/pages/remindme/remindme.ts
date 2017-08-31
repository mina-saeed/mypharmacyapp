import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { BasketPage } from '../basket/basket';
import { MenuPage } from '../menu/menu';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { WheelSelector } from '@ionic-native/wheel-selector';

/**
 * Generated class for the RemindmePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-remindme',
  templateUrl: 'remindme.html',
})
export class RemindmePage {
    postList;
    date={ "day": [{"name":"1"}, {"name":"2"},
{"name":"3"}, {"name":"4"}, {"name":"5"},
{"name":"6"}, {"name":"7"}, {"name":"8"},
{"name":"9"}, {"name":"10"}, {"name":"11"},
{"name":"12"}, {"name":"13"}, {"name":"14"}, {"name":"15"},
{"name":"16"}, {"name":"17"}, {"name":"18"},
{"name":"19"}, {"name":"20"}, {"name":"21"}, {"name":"22"},
{"name":"23"}, {"name":"24"}, {"name":"25"},
{"name":"26"}, {"name":"27"},{"name":"28"},{"name":"29"},{"name":"30"}] ,

 "month": [ {"name":"JAN"}, {"name":"FEB"},
{"name":"MAR"}, {"name":"APR"}, {"name":"MAY"},
{"name":"JUN"}, {"name":"JUL"}, {"name":"AUG"},
{"name":"SEP"}, {"name":"OCT"}, {"name":"NOV"},
{"name":"DEC"}]};
    time={ "hour": [{"name":"1"}, {"name":"2"},
{"name":"3"}, {"name":"4"}, {"name":"5"},
{"name":"6"}, {"name":"7"}, {"name":"8"},
{"name":"9"}, {"name":"10"}, {"name":"11"},
{"name":"12"}] ,

 "min": [{"name":"1"}, {"name":"2"},
{"name":"3"}, {"name":"4"}, {"name":"5"},
{"name":"6"}, {"name":"7"}, {"name":"8"},
{"name":"9"}, {"name":"10"}, {"name":"11"},
{"name":"12"}, {"name":"13"}, {"name":"14"}, {"name":"15"},
{"name":"16"}, {"name":"17"}, {"name":"18"},
{"name":"19"}, {"name":"20"}, {"name":"21"}, {"name":"22"},
{"name":"23"}, {"name":"24"}, {"name":"25"},
{"name":"26"}, {"name":"27"},{"name":"28"},{"name":"29"},{"name":"30"},{"name":"31"}, {"name":"32"}, {"name":"33"},{"name":"34"}, {"name":"35"}, {"name":"36"},
{"name":"37"}, {"name":"38"},{"name":"39"},{"name":"40"},{"name":"41"},{"name":"42"}, {"name":"43"},{"name":"44"},{"name":"45"},{"name":"46"},{"name":"47"},{"name":"48"},{"name":"49"},{"name":"50"},{"name":"51"},{"name":"52"},{"name":"53"},{"name":"54"},{"name":"55"},{"name":"56"},{"name":"57"},{"name":"58"},{"name":"59"}],
"apm": [{"name": "AM"},{"name":"PM"}]};
    getPosts(){
        this.remoteService.getPosts().subscribe((data)=>{
            this.postList = data;
        });
    }
        selectedCity="";

  private translate: TranslateService;

  constructor(private selector: WheelSelector,private remoteService : RemoteServiceProvider, translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
   this.translate = translate;
    //this.translate.use('en');
  }
  goBasket(){
    this.navCtrl.push(BasketPage, {defaultOrNot: 0}); //kda hatly el default!! hwa ma3mlsh select
  }
  goMenu(){
    this.navCtrl.push(MenuPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemindmePage');
  }
  selectDay() {
   //this.getPosts();

/*   this.selector.show({
     title: "",
     items: [
       this.date.day,
       this.date.month
     ],wrapWheelText: true,
     positiveButtonText: "",
      negativeButtonText: "",displayKey: 'name',
   }).then(
     result => {
       console.log(result[0].name);
       this.selectedCity = result[0].name;
     },
     err => console.log('Error: ', err)
   );

 }
   selectTime() {
   //this.getPosts();

   this.selector.show({
     title: "",
     items: [
       this.time.hour,
       this.time.min,
       this.time.apm
     ],  wrapWheelText: true,

     displayKey: 'name',
   }).then(
     result => {
       console.log(result[0].name);
       this.selectedCity = result[0].name;
     },
     err => console.log('Error: ', err)
   );*/

 }
}

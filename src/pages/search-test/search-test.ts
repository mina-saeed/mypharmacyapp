import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchTestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-test',
  templateUrl: 'search-test.html',
})
export class SearchTestPage {

  public showList: boolean;

  orderTest= {

    data: [

    {id:1, name:"Medicine1", price:4, qty:3},

    {id:2, name:"Medicine2", price:5, qty:5},

    {id:3, name:"Medicine3", price:2, qty:1},

  ]};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.showList = false;  //initialise things to be visible
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTestPage');
  }
  searchByName(ev) {
  /*  this.http.get(this.url + 'search/' + ev.target.value.toString(), new RequestOptions({headers: this.setGetHeaders()}))
    .map(res => res).subscribe(data => {
    //  alert(ev.target.value.toString());  //just for testing
    console.log(this.url + 'search/' + ev.target.value.toString());
      alert(data);  //just for testing
      console.log(data);
    });*/
  }
  updateListByName(ev) {

    this.showList = true; //when start searching, show the list
    //if statement make it false when deleted all characters!!


    console.log(ev.target.value);
    console.log(this.orderTest["data"][0]["name"]);
    //this.orderTest["data"].pop();
  }
  onCancelByName(ev){
    this.showList = false; //and true to show other components
  }

}

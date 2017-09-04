import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';

import { LocationPage } from '../location/location';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RegisterEmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-email',
  templateUrl: 'register-email.html',
})
export class RegisterEmailPage {
  //public var validation_messages;

  validations_form: FormGroup;
  confirmPassword:string;
  url:string;
  userData = {
      name: "",
      email: "",
      password: "",
      token: "",
    };
   validation_messages = {
    'name':[
    {type:'required',message:''},
    { type: 'pattern', message: '' }

    ],
    'email':[
      { type: 'required', message: '' },
      { type: 'pattern', message: '' }
    ],
    'password': [
      { type: 'required', message: '' },
      { type: 'minlength', message: '' }
    ],
    'confirm': [
      { type: 'required', message: '' },
     { type: 'match', message: '' }
    ],
    };
  private translate: TranslateService;
  currentLanguage: string;

  constructor(private alertCtrl: AlertController,translate: TranslateService,public navCtrl: NavController, public navParams: NavParams,
  public http:Http,public formBuilder: FormBuilder) {
    this.url = 'http://146.185.148.66:3000/';
        this.translate=translate;
      if (this.translate.currentLang =='ar') {
        this.currentLanguage = "ar";
      }
      else {
        this.currentLanguage = "en";
  }
                    this.translate = translate;
                    //this.translate.use('ar');
               this.translate.get('NAMEVAL').subscribe((result: string) => {
                this.validation_messages.name[0].message = result;
          });
          this.translate.get('NAMEVAL1').subscribe((result: string) => {
                this.validation_messages.name[1].message = result;
          });
        this.translate.get('EMAILVAL').subscribe((result: string) => {
                this.validation_messages.email[0].message = result;
          });
                this.translate.get('PASSVAL').subscribe((result: string) => {
                this.validation_messages.password[0].message = result;
                });
                this.translate.get('PASSVAL1').subscribe((result: string) => {
                this.validation_messages.password[1].message = result;
                });
                this.translate.get('CONFIRMVAL').subscribe((result: string) => {
                this.validation_messages.confirm[0].message = result;
                });

         this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,Validators.pattern('[^0-9].*')])),
      email: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,Validators.minLength(6)]))
});
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterEmailPage');
  }

  register(){
    console.log("register button");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');


    //add more, eli homa device id w kol 7aga
    let body = {
      name: this.userData.name,
      email: this.userData.email,
      password: this.userData.password,
      token: "aadsffsfv",
    };

    if(this.userData.email == "" || this.userData.password == "")
    {
      if(this.currentLanguage == "en"){
        this.customAlert("Error", "Do not leave any field empty", "Close");
      }else if(this.currentLanguage =="ar"){
       this.customAlert("خطأ", "لا تترك أي مساحة فارغة", "أغلق");
      }
    }else if (this.userData.password != this.confirmPassword){
      if(this.currentLanguage == "en"){
        this.customAlert("Error", "Passwords must match", "Close");
      }else if(this.currentLanguage =="ar"){
       this.customAlert("خطأ", "كلمات السر يجب أن تكون هي نفسها", "أغلق");
      }
    }else{
      this.http.post(this.url + 'register', JSON.stringify(body), new RequestOptions({headers:headers}))
      .map(res => res).subscribe(data => {

        console.log(data);
        this.navCtrl.push(LocationPage, this.userData.name); //roo7 kamel el form beta3t el 3enwan

      },  err =>{
        console.log(err);
      });
    }

  }
  customAlert(title, message, buttonText){
    let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: buttonText,

          }
        ]
      });
      alert.present();
  }
}

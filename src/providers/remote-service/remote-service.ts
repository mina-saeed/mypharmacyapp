import { Injectable } from '@angular/core';
import {Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Headers, RequestOptions} from '@angular/http';





/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
	//headers:Headers;
  constructor(public http: Http) {
 
  }

//getApiUrl : string = "https://jsonplaceholder.typicode.com/posts";

getPosts() {
 //   let headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
   // headers.append('Access-Control-Allow-Origin', '*');
   // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
   // headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');
    //add more, eli homa device id w kol 7aga
  //  let body = new FormData();
  //  body.append("deviceID", "50");

    return this.http.get('http://146.185.148.66/locations/settings.json')
			.do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json());

}
}

import { Injectable } from '@angular/core';
import {Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';





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

getPosts() {
//http://146.185.148.66/locations/settings.json
    return this.http.get('settings.json')
			.do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json());

}
updateFile(json){
  return this.http.post('settings.json',json)
    .do((res : Response ) => console.log(res.json()))
          .map((res : Response ) => res.json());
}
}

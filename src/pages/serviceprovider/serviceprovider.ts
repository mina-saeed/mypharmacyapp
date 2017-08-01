import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
/*
@Injectable()
export class Serviceprovider {
    constructor(public http:Http) {}

getData() {
    return this.http.get("./www/assets/JSON/settings.json")
        .map((res:Response) => res.json().cities); //records in this case
  }
  
  load() {
    console.log('json called');
    return new Promise(resolve => {
        this.http.get('./www/assets/JSON/settings.json').map(response => {
            this.data = response.json();
            resolve(this.data);
        });
    });
}
}

*/
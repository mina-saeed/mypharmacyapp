import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestStorageProvider {

  constructor(public storage: Storage) {
    storage.ready().then(() => { });
  }

    save(language: string) {
    this.storage.ready().then(() => {
    this.storage.set("language",JSON.stringify(language ))
     });
         
  }

 load(): any {
    this.storage.ready().then(() => {
      this.storage.get("language").then((language) => {
        //console.log('Your name is', val);
        return language;
      });
    });
  }

}
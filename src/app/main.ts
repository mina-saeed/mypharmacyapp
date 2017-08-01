import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/operator/toPromise';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

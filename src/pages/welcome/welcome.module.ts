import { NgModule } from '@angular/core';
import { IonicPageModule, Platform } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate';
import { defaultLanguage, availableLanguages, sysOptions } from './welcome.constants';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),TranslateModule
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomePageModule {
	constructor(platform: Platform, translate: TranslateService) {
		console.log("welcooooooome");
		platform.ready().then(() => {
				// this language will be used as a fallback when a translation isn't found in the current language
				translate.setDefaultLang(defaultLanguage);
/*
				if ((<any>window).cordova) {

					Globalization.getPreferredLanguage().then(result => {
						var language = this.getSuitableLanguage(result.value);
						console.log(language);
						//alert(language);
						translate.use(language);
						sysOptions.systemLanguage = language;
					});
				} else {
					let browserLanguage = translate.getBrowserLang() || defaultLanguage;
					var language = this.getSuitableLanguage(browserLanguage);
					//alert(language);
					translate.use(language);
					sysOptions.systemLanguage = language;
				} */
			}
		);
	}


	getSuitableLanguage(language) {
		language = language.substring(0, 2).toLowerCase();
		return availableLanguages.some(x => x.code == language) ? language : defaultLanguage;
	}

}

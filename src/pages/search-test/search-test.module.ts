import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTestPage } from './search-test';

@NgModule({
  declarations: [
    SearchTestPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchTestPage),
  ],
  exports: [
    SearchTestPage
  ]
})
export class SearchTestPageModule {}

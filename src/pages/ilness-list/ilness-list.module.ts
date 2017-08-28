import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IlnessListPage } from './ilness-list';

@NgModule({
  declarations: [
    IlnessListPage,
  ],
  imports: [
    IonicPageModule.forChild(IlnessListPage),
  ],
  exports: [
    IlnessListPage
  ]
})
export class IlnessListPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemindmePage } from './remindme';

@NgModule({
  declarations: [
    RemindmePage,
  ],
  imports: [
    IonicPageModule.forChild(RemindmePage),
  ],
  exports: [
    RemindmePage
  ]
})
export class RemindmePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeReminderPage } from './time-reminder';

@NgModule({
  declarations: [
    TimeReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeReminderPage),
  ],
  exports: [
    TimeReminderPage
  ]
})
export class TimeReminderPageModule {}

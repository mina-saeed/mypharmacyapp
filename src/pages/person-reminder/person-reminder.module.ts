import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonReminderPage } from './person-reminder';

@NgModule({
  declarations: [
    PersonReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonReminderPage),
  ],
  exports: [
    PersonReminderPage
  ]
})
export class PersonReminderPageModule {}

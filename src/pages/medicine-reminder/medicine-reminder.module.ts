import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineReminderPage } from './medicine-reminder';

@NgModule({
  declarations: [
    MedicineReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineReminderPage),
  ],
  exports: [
    MedicineReminderPage
  ]
})
export class MedicineReminderPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemindersMedicinesListPage } from './reminders-medicines-list';

@NgModule({
  declarations: [
    RemindersMedicinesListPage,
  ],
  imports: [
    IonicPageModule.forChild(RemindersMedicinesListPage),
  ],
  exports: [
    RemindersMedicinesListPage
  ]
})
export class RemindersMedicinesListPageModule {}

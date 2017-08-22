import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedRemindersMedicinesListPage } from './detailed-reminders-medicines-list';

@NgModule({
  declarations: [
    DetailedRemindersMedicinesListPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailedRemindersMedicinesListPage),
  ],
  exports: [
    DetailedRemindersMedicinesListPage
  ]
})
export class DetailedRemindersMedicinesListPageModule {}

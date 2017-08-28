import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicinesListPage } from './medicines-list';

@NgModule({
  declarations: [
    MedicinesListPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicinesListPage),
  ],
  exports: [
    MedicinesListPage
  ]
})
export class MedicinesListPageModule {}

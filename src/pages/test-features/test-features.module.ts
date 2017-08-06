import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestFeaturesPage } from './test-features';

@NgModule({
  declarations: [
    TestFeaturesPage,
  ],
  imports: [
    IonicPageModule.forChild(TestFeaturesPage),
  ],
  exports: [
    TestFeaturesPage
  ]
})
export class TestFeaturesPageModule {}

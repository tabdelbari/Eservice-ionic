import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DemmandePage } from './demmande.page';
import { FeedbackPage } from '../feedback/feedback.page';

const routes: Routes = [
  {
    path: '',
    component: DemmandePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DemmandePage,FeedbackPage],
  entryComponents: [FeedbackPage]
})
export class DemmandePageModule {}

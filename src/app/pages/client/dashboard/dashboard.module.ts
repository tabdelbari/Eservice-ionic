import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { AddPage } from '../add/add.page';
import { DemmandePage } from '../demmande/demmande.page';
import { FeedbackPage } from '../feedback/feedback.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage,AddPage,DemmandePage,FeedbackPage],
  entryComponents: [AddPage,DemmandePage,FeedbackPage]
})
export class DashboardPageModule {}

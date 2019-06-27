import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },  
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  
  { path: 'specialiste', loadChildren: './pages/specialiste/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'client', loadChildren: './pages/client/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'demmande', loadChildren: './pages/client/demmande/demmande.module#DemmandePageModule' },
  { path: 'add', loadChildren: './pages/client/add/add.module#AddPageModule' },
  { path: 'feedback', loadChildren: './pages/client/feedback/feedback.module#FeedbackPageModule' },
  { path: 'location', loadChildren: './pages/specialiste/location/location.module#LocationPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


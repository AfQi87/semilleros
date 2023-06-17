import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CanActivateViaAuthGuard } from './services/can-activate-via-auth-guard.guard';


const routes: Routes = [

  { path: 'dashboard', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES ,canActivate: [CanActivateViaAuthGuard] },
  // { path: '', redirectTo: 'auth/sign-in' },
  // { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  { path: '**', redirectTo: 'auth/sign-in'},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserQueryComponent } from './users/user-query/user-query.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: UserQueryComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

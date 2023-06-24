import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserQueryComponent } from './users/user-query/user-query.component';
import { SemilleroQueryComponent } from './semillero/semillero-query/semillero-query.component';
import { ProjectQueryComponent } from './project/project-query/project-query.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: UserQueryComponent,
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'semilleros',
        component: SemilleroQueryComponent,
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'project',
        component: ProjectQueryComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

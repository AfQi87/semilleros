import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./../../auth/auth.module').then(m => m.AuthModule)
    // }

];
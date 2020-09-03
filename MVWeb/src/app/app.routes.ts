import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';


const appRoutes: Routes = [
    {
    path: 'home', component: PagesComponent,
    loadChildren: () => import('src/app/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path:'',redirectTo: 'home', pathMatch: 'full'
    },
    {path: '404', component: ErrorpageComponent},
    {path: '**', redirectTo: '/404'}
    
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
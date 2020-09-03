import { RouterModule, Routes } from '@angular/router';


import { SearchPanelComponent } from './search-panel/search-panel.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';




const pagesRoutes: Routes = [
    
    { path: 'busqueda', component: SearchPanelComponent, data: { titulo: 'busqueda' } 
    },
    { path: 'inicio', component: HomeComponent, data: { titulo: 'inicio' } 
    },
    { path: 'login', component: LoginComponent, data: { titulo: 'login' } },
    { path: 'register', component: RegisterComponent , data: { titulo: 'register' }},

    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
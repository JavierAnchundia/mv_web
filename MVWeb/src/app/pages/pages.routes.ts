import { RouterModule, Routes } from '@angular/router';


import { SearchPanelComponent } from './search-panel/search-panel.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MuroFallecidoComponent } from './muro-fallecido/muro-fallecido.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FavoritosComponent } from './favoritos/favoritos.component';



const pagesRoutes: Routes = [
    
    { path: 'busqueda', component: SearchPanelComponent, data: { titulo: 'busqueda' } 
    },
    { path: 'inicio', component: HomeComponent, data: { titulo: 'inicio' } 
    },
    { path: 'login', component: LoginComponent, data: { titulo: 'login' } },
    { path: 'register', component: RegisterComponent , data: { titulo: 'register' }},
    { path: 'muro', component: MuroFallecidoComponent , data: { titulo: 'muro' }},
    { path: 'perfil', component: PerfilComponent , data: { titulo: 'perfil' }},
    { path: 'favoritos', component: FavoritosComponent , data: { titulo: 'favoritos' }},


    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
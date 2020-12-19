import { RouterModule, Routes } from '@angular/router';


import { SearchPanelComponent } from './search-panel/search-panel.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MuroFallecidoComponent } from './muro-fallecido/muro-fallecido.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { LogInGuard } from '../guards/logIn/log-in.guard';
import { ContactoComponent } from './contacto/contacto.component';
import { NosotrosComponent } from './nosotros/nosotros.component';



const pagesRoutes: Routes = [

    { path: 'busqueda', component: SearchPanelComponent, data: { titulo: 'busqueda' }
    },
    { path: 'inicio', component: HomeComponent, data: { titulo: 'inicio' }
    },
    { path: 'login', component: LoginComponent, data: { titulo: 'login' } },
    { path: 'register', component: RegisterComponent , data: { titulo: 'register' }},
    { path: 'muro', component: MuroFallecidoComponent , data: { titulo: 'muro' }},
    { path: 'perfil', component: PerfilComponent , data: { titulo: 'perfil' }, canActivate: [LogInGuard]},
    { path: 'favoritos', component: FavoritosComponent , data: { titulo: 'favoritos' }, canActivate: [LogInGuard]},
    { path: 'paquetes', component: PaquetesComponent , data: { titulo: 'paquetes' }},
    { path: 'contacto', component: ContactoComponent , data: { titulo: 'contacto' }},
    { path: 'nosotros', component: NosotrosComponent , data: { titulo: 'nosotros' }},



    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
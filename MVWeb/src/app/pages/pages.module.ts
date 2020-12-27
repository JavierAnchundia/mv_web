import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';

import { SearchPanelComponent } from './search-panel/search-panel.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MuroFallecidoComponent } from './muro-fallecido/muro-fallecido.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TextPostComponent } from './muro-fallecido/text-post/text-post.component';
import { ImagenPostComponent } from './muro-fallecido/imagen-post/imagen-post.component';
import { VideoPostComponent } from './muro-fallecido/video-post/video-post.component';
import { ModalComponent } from './muro-fallecido/modal/modal/modal.component';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { AudioPostComponent } from './muro-fallecido/audio-post/audio-post.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { PaqueteModalComponent } from './home/paquete-modal/paquete-modal.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NosotrosComponent } from './nosotros/nosotros.component'
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import {GoogleMapsModule} from '@angular/google-maps'; 

export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD-MM-YYYY',
    },
    display: {
      dateInput: 'MMM DD, YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
  }; 

@NgModule({
    declarations: [
        SearchPanelComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MuroFallecidoComponent,
        TextPostComponent,
        ImagenPostComponent,
        VideoPostComponent,
        ModalComponent,
        AudioPostComponent,
        PerfilComponent,
        FavoritosComponent,
        PaquetesComponent,
        PaqueteModalComponent,
        ContactoComponent,
        NosotrosComponent,

    ],
    exports: [
        SearchPanelComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TextPostComponent,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatDialogModule,
        FavoritosComponent

    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        HttpClientModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        MatListModule,
        MatDialogModule,
        NgxSkeletonLoaderModule,
        MatToolbarModule,
        SlickCarouselModule,
        MatMomentDateModule,
        MatNativeDateModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyD4O-t27PSlyGg2_K6fHbPKlO9Tu_x5h-4',
          libraries: ['places', 'drawing', 'geometry'],
        }),
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        
    ],
})
export class PagesModule { }
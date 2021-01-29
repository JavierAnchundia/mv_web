import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import URL_SERVICIOS from 'src/app/config/config';
import { CamposantoService } from 'src/app/services/camposanto/camposanto.service';
import { PaquetesService } from '../../../services/paquete/paquetes.service';
import { ModalComponent } from '../../muro-fallecido/modal/modal/modal.component';
import { PaqueteModalComponent } from '../paquete-modal/paquete-modal.component';

interface Marker {
  lat: Number;
  lng: Number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  slides = [342, 453, 846, 855, 234, 564, 744, 243];
  public paquetes = [];
  url_backend = URL_SERVICIOS.url_backend;
  public loaded = false;

  private id: any;
  public campo: any;
  public empresa: any;
  public redes: any;
  marker: Marker;
  zoom: number = 16;
  // inicializar punto central del mapa
  lat: any;
  lng: any;
  markers: Marker[] = [];
  show: Boolean = false;
  loadedInfo:boolean = false;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    variableHeight: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(
    private paquete: PaquetesService,
    public matDialog: MatDialog,
    private camposanto: CamposantoService,
  ) {
    this.id = JSON.parse(localStorage.getItem('info'));
   }

  ngOnInit(): void {
    this.cargarPaquetes();
    this.cargarInfoCamposanto();
    this.cargarRedes();
    this.cargarPuntosGeoMapa(this.id.camposanto);
  }

  addSlide() {
    this.slides.push(488);
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  cargarPaquetes() {
    const id = JSON.parse(localStorage.getItem('info'));
    this.paquete.getPaquetesRecientes(id.camposanto).subscribe(
      (data: any) => {
        this.paquetes = data;
        this.loaded = true;
      }
    );
  }

  openModal(paq) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '450px';
    dialogConfig.width = '450px';
    dialogConfig.data = {
      paquete: paq
    };
    const modalDialog = this.matDialog.open(PaqueteModalComponent, dialogConfig);
}

cargarInfoCamposanto(){
  this.camposanto.getCamposantoByID(this.id.camposanto).subscribe(
    (data: any) => {
      console.log(data);
      this.campo = data;
      this.camposanto.getEmpresa(data.id_empresa).subscribe(
        (resp: any) => {
          this.empresa = resp;
          console.log(resp);
        }
      );
    }
  );
}

cargarRedes(){
  this.camposanto.getRedes(this.id.camposanto).subscribe(
    (data: any) => {
      this.redes = data;
      console.log(data);
    }
  )
}

async cargarPuntosGeoMapa(id){
  await this.camposanto.getListGeolocalizacion(id).subscribe(
    (data) => {
      this.show = true;

      for(let punto in data){
        this.marker = {
          lat : data[punto].latitud,
          lng: data[punto].longitud
        }
        this.markers.push(this.marker);
      }
      this.loadedInfo = true;
      this.lat = data[0].latitud;
      this.lng = data[0].longitud;
      console.log(data);
    }
  )
}

}

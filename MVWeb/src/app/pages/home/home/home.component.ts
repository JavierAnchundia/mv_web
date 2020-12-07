import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import URL_SERVICIOS from 'src/app/config/config';
import { PaquetesService } from '../../../services/paquete/paquetes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  slides = [342, 453, 846, 855, 234, 564, 744, 243];
  public paquetes = [];
  url_backend: String = URL_SERVICIOS.url_backend;

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
    private paquete: PaquetesService
  ) { }

  ngOnInit(): void {
    this.cargarPaquetes();
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
    this.paquete.getPaquetes(id.camposanto).subscribe(
      (data: any) => {
        this.paquetes = data;
      }
    );
  }

}

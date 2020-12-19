import { Component, NgZone, OnInit } from '@angular/core';
import { CamposantoService } from '../../services/camposanto/camposanto.service';

interface Marker {
  lat: Number;
  lng: Number;
}

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})

export class NosotrosComponent implements OnInit {
  private id: any;
  public campo: any;
  public empresa: any;
  public redes: any;

  marker: Marker;
  zoom: number = 14;
  // inicializar punto central del mapa
  lat: any;
  lng: any;
  markers: Marker[] = [];
  show: Boolean = false;
  loaded:boolean = false;

  

  constructor(
    private camposanto: CamposantoService,

  ) {
    this.id = JSON.parse(localStorage.getItem('info'));

  }

  ngOnInit(): void {
    this.cargarInfoCamposanto();
    this.cargarRedes();
    this.cargarPuntosGeoMapa(this.id.camposanto);
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
        this.loaded = true;
        this.lat = data[0].latitud;
        this.lng = data[0].longitud;
        console.log(data);
      }
    )
  }
}


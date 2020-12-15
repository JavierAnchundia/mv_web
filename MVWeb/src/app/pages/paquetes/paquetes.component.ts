import { Component, OnInit } from '@angular/core';
import URL_SERVICIOS from 'src/app/config/config';
import { PaquetesService } from 'src/app/services/paquete/paquetes.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {
  public paquetes = [];
  url_backend = URL_SERVICIOS.url_backend;
  public loaded = false;
  constructor(
    private paquete: PaquetesService,
  ) { }

  ngOnInit(): void {
    this.cargarPaquetes();
  }

  cargarPaquetes(){
    const id = JSON.parse(localStorage.getItem('info'));
    this.paquete.getPaquetes(id.camposanto).subscribe(
      (data: any) => {
        this.paquetes = data;
        this.loaded = true;
      }
    );
  }
}

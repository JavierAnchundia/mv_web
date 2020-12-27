import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/empresa.model';
import URL_SERVICIOS from 'src/app/config/config';

export class Punto_geolocalizacion{
  id_punto: Number
  latitud:Number
  longitud:Number
  id_camposanto: Number
}

@Injectable({
  providedIn: 'root'
})
export class CamposantoService {

  constructor(private http: HttpClient) { }

  getCamposantoByID(id) {
    const url = URL_SERVICIOS.camposanto + id + '/';

    return this.http.get(url);
  }

  getEmpresa(id): Observable<Empresa>{
    const url = URL_SERVICIOS.empresa_get + id + '/';
    return this.http.get<Empresa>(url);
  }

  
  getListGeolocalizacion(id):Observable<Punto_geolocalizacion[]>{
    let url = URL_SERVICIOS.geolocalizacion_camp + String(id) + '/';
    return this.http.get<Punto_geolocalizacion[]>(url);
  }

  getRedes(id) {
    const url = URL_SERVICIOS.red_social + id + '/';

    return this.http.get(url);
  }
}

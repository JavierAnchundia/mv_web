import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import URL_SERVICIOS from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  constructor(
    private http: HttpClient,
  ) { }

  getPaquetes(id){
    const url = URL_SERVICIOS.paquetes + id + '/';

    return this.http.get(url);
  }
}

import { Injectable } from '@angular/core';
import URL_SERVICIOS from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DifuntoService {

  constructor(private http: HttpClient) { }


getDifuntos(id,nombre,apellido) {
  let url = URL_SERVICIOS.difuntos+id+'/'+nombre+'/'+ apellido+'/';

  return this.http.get(url);
}
}
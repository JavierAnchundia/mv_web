import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/empresa.model';
import URL_SERVICIOS from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CamposantoService {

  constructor(private http: HttpClient) { }

  getCamposantoByID(id: String) {
    let url = URL_SERVICIOS.camposanto + id + '/';

    return this.http.get(url)
  }

  getEmpresa(id: String):Observable<Empresa>{
    let url = URL_SERVICIOS.empresa_get + id + '/';
    return this.http.get<Empresa>(url);
  }
}

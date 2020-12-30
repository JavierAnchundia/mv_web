import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import URL_SERVICIOS from 'src/app/config/config';
import { Contacto } from 'src/app/models/contacto.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient, private _usuarioService: UsuarioService) { }

  getAllContactos():Observable<FormData>{
    let url = URL_SERVICIOS.contacto;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.get<FormData>(url, httpOptions)
  }  
  
  
  postContacto(contacto):Observable<FormData>{
    let url = URL_SERVICIOS.contacto;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.post<FormData>(url, contacto, httpOptions)
  }

}

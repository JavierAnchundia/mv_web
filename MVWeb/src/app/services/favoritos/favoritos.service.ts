import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import URL_SERVICIOS from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) { }

  agregarFavorito(favorito):Observable<FormData>{
    let url = URL_SERVICIOS.favoritos;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.post<FormData>(url,favorito,httpOptions)
  }

  //Con información de difuntos
  obtenerFavoritos(id){
    let url = URL_SERVICIOS.favoritos + id +'/';
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.get(url, httpOptions);
  }

  //Obtener sólo los IDs de los difuntos
  loadFavoritos(id){
    let url = URL_SERVICIOS.favoritos_list + id + '/';
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.get(url, httpOptions);

  }

  removeFavorito(id_usuario, id_difunto){
    let url = URL_SERVICIOS.favoritos_del +id_usuario + '/'+id_difunto   + '/';
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }

    return this.http.delete(url,httpOptions);
  }
}

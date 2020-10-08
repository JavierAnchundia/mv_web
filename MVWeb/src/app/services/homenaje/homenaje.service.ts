import { Injectable } from '@angular/core';
import URL_SERVICIOS from 'src/app/config/config';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HomenajeService {

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) { }

  getHomenajesByID(id: String) {
    let url = URL_SERVICIOS.homenajes + id + '/';

    return this.http.get(url)
  }

  postMensajes(mensaje):Observable<FormData>{
    let url = URL_SERVICIOS.hmensaje_post;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.post<FormData>(url, mensaje,httpOptions);

  }

  postImagen(imagen):Observable<FormData>{
    let url = URL_SERVICIOS.himagen_post;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.post<FormData>(url, imagen,httpOptions);

  }

  postVideo(video):Observable<FormData>{
    let url = URL_SERVICIOS.hvideo_post;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.post<FormData>(url, video ,httpOptions);

  }

  postAudio(audio):Observable<HttpEvent<any>>{
    let url = URL_SERVICIOS.haudio_post;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.post<HttpEvent<any>>(url, audio, {reportProgress: true, headers: new HttpHeaders({
      'Authorization': 'Bearer '+this._usuarioService.getToken(),
    })});
    

  }

  uploadVideo(formData): Observable<HttpEvent<any>> {
    
    const req = new HttpRequest('POST', URL_SERVICIOS.hvideo_post, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    } );
    

    return this.http.request(req);
  }

  postHomenaje(homenaje):Observable<FormData>{
    let url = URL_SERVICIOS.homenaje_post;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.post<FormData>(url, homenaje, httpOptions);


  }

  dejarRosa(id:any){
    let url = URL_SERVICIOS.addRoses + id +'/1/';
    
    return this.http.patch(url,1);
  }

  postRegistroRosa(registro){
    let url = URL_SERVICIOS.registroRosa;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.post(url, registro, httpOptions);
  }

  getLogRosas(id:any){
    let url = URL_SERVICIOS.logRosas+id+'/'
    return this.http.get(url);

  }

}

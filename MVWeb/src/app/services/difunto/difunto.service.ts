import { Injectable, Output, EventEmitter } from '@angular/core';
import URL_SERVICIOS from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DifuntoService {

  constructor(private http: HttpClient) { }
  private _cargarLista = new Subject<string>();
  busquedaLista$ = this._cargarLista.asObservable();

  recarga_busqueda(message: string){
    this._cargarLista.next(message);
  }

getDifuntos(id,nombre,apellido):Observable<any[]> {
  let url = URL_SERVICIOS.difuntos+id+'/'+nombre+'/'+ apellido+'/';

  return this.http.get<any[]>(url);
}

getDifuntoByID(id){
  let url = URL_SERVICIOS.difunto+id+'/';

  return this.http.get(url);
}
}
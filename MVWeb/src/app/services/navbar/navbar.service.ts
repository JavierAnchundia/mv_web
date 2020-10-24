import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  private _cargarusername = new Subject<string>();
  updateUsername$ = this._cargarusername.asObservable();

  recarga_Username(message: string){
    this._cargarusername.next(message);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NavbarService } from '../navbar/navbar.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private httpOptions: any;

  public token: string;
  public refresh: string;
  public user: string;
  public token_expires: Date;
  public username: string;
  public errors: any = [];
  public isLoggedin = false;



  constructor(
    public http: HttpClient,
    public router: Router,
    private _navbar: NavbarService
  ) {
    this.loadStorage();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  public loginUser(user) {
    localStorage.setItem('username', user['username']);
    const url = URL_SERVICIOS.login;
    return this.http.post(url, JSON.stringify(user), this.httpOptions).pipe(
      map((resp: any) => {
        console.log(resp);
        this.isLoggedin = true;
        this.token = JSON.stringify(resp['access']);
        this.refresh = JSON.stringify(resp['refresh']).slice(1, -1);
        this.updateData(resp['access']);
        localStorage.setItem('token', this.token);
        localStorage.setItem('refresh', this.refresh);
        localStorage.setItem('id', JSON.stringify(this.tokenGestion(resp['access'])));
        localStorage.setItem('user', JSON.stringify(this.tokenGestion(resp['access'])));
        return true;
      })
    );
  }

  islogIn() {
    return this.token.length > 5 ? true : false;
  }

  statusLogin(){
    const tokenDjango = localStorage.getItem('token');
    const tokenFacebook = localStorage.getItem('FBtoken');
    if (tokenDjango || tokenFacebook){
      return true;
    }
    else{
      return false;
    }
  }
  loadStorage() {
    if (localStorage.getItem('token') && localStorage.getItem('refresh')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      let expires_in = JSON.parse(localStorage.getItem('id'))['exp'];
      let tiempo_token_exp = new Date(expires_in * 1000).getTime() -  new Date().getTime();
      // console.log(tiempo_token_exp)
      if (tiempo_token_exp <= 300000){
        this.refreshToken();
      }
    }
    else {
      this.token = '';
      this.user = null;
    }
  }

  tokenGestion(token) {
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    return token_decoded;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public refreshToken() {
    const url = URL_SERVICIOS.refreshlogin;
    this.http.post(url, { "refresh" : localStorage.getItem('refresh')}, this.httpOptions).subscribe(
      data => {
        localStorage.setItem('token', data['access']);
        localStorage.setItem('id', JSON.stringify(this.tokenGestion(data['access'])));
        localStorage.setItem('user', JSON.stringify(this.tokenGestion(data['access'])));
        this.updateData(data['access']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logoutUser() {
    this.token = '';
    this.token_expires = null;
    this.username = null;
    localStorage.removeItem('FBtoken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('tipo_user');
    localStorage.removeItem('refresh');
    this.isLoggedin = false;

  }

  private updateData(token) {
    this.token = token;
    this.errors = [];

    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  getInti(id) {
    const url = URL_SERVICIOS.usuario + id;
    return this.http.get(url);
  }

  crearUsuario(usuario) {
    const url = URL_SERVICIOS.usuario;
    return this.http.post(url, usuario);
  }

  crearUsuarioFB(usuario) {
    const url = URL_SERVICIOS.fblogin;
    this.isLoggedin = true;

    return this.http.post(url, usuario);
  }

  loginUsuarioFB(userToken){
    const url = URL_SERVICIOS.FBauth;
    this.isLoggedin = true;
    return this.http.post(url, userToken).pipe(
      map((resp: any) => {
        console.log(resp);
        this.isLoggedin = true;
        this.token = JSON.stringify(resp['access']);
        this.refresh = JSON.stringify(resp['refresh']).slice(1, -1);
        this.updateData(resp['access']);
        localStorage.setItem('token', this.token);
        localStorage.setItem('refresh', this.refresh);
        localStorage.setItem('id', JSON.stringify(this.tokenGestion(resp['access'])));
        return true;
      })
    ); ;

  }

  isAuthenticated(){
    return this.getToken();
  }

  getUsersAll(){
    const url = URL_SERVICIOS.obtener_usuarios;
    return this.http.get(url);
  }

  getUserInfo(id){
    const url = URL_SERVICIOS.usuario + id + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    };
    return this.http.get(url, httpOptions);

  }

  updateUserProfile(username, info){
    const url = URL_SERVICIOS.updateUser + username + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
      })
    };

    return this.http.put(url, info, httpOptions);
  }

  obtenerUserInfo(username){
    const url = URL_SERVICIOS.userInfo + username + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    };
    return this.http.get(url, httpOptions);
  }

}

import { Component, OnInit } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { FacebookService, InitParams, LoginResponse, AuthResponse, LoginOptions } from 'ngx-facebook';
import Swal from 'sweetalert2'
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faFacebookF = faFacebookF;
  private user: any;
  authresp;
  userinfo;
  id:any;
  public form_login: FormGroup;

  // login with options


  constructor(
    private formb: FormBuilder,
    public _usuarioService: UsuarioService,
    public router: Router,
    private fb: FacebookService
  ) {
    const initParams: InitParams = {
      appId: '921830748297038',
      xfbml: true,
      version: 'v8.0'
    };

    fb.init(initParams);
   }

  ngOnInit(): void {
    this.id = localStorage.getItem(JSON.parse(localStorage.getItem('info')));
    this.form_login = this.formb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      contrasena: [null, Validators.compose([Validators.required])]
    });
    this.user = {
      email: ' ',
      password: ' '
    };
  }

  loginUser(form){
    if(form.invalid){
      return; 
    }
    this.user.email = form.value.email;
    this.user.password = form.value.contrasena;

    this._usuarioService.loginUser(this.user)
                        .subscribe( resp=>{
                          console.log(resp);
                          console.log('token creado desde componente login')
                          Swal.close();
                          this.router.navigate(['/home']);

                        }, error=>{
                          Swal.close();
                          Swal.fire('Correo o contraseña incorrectos',error);
                          this.form_login.reset();
                        }); 

  }

  tokenGestion(token){
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    return token_decoded;
  }

  registrarme(){
    this.router.navigate(['/home/register'])
  }

  submit() {
    console.log(this.form_login.value);
    this.loginUser(this.form_login);
    Swal.showLoading();
  }

  loginWithFacebook() {
    console.log('aqui')
    const options: LoginOptions = {
      scope: 'email',
      return_scopes: true,
    };


    this.fb.login(options)
      .then(
        (response: LoginResponse) => {
          console.log('Logged in')
           this.authresp = this.fb.getAuthResponse();
          localStorage.setItem('FBtoken',this.authresp.accessToken);
          this.getProfile();
          this.router.navigate(['/home/inicio']);
          
        } ).then(
          (value:any)=>{
            this.crearFBuser(this.authresp.accessToken, this.user);
          }
        )  
      .catch((error: any) => console.error(error));
  }

  crearFBuser(authresp: any, user:any) {
    const formData = new FormData();

    formData.append('grant_type', 'convert_token');
    formData.append('client_id', 'tg0UMkMCY2jwCdFT2QwWY9eStMC67py6bCxQJ3gB');
    formData.append('backend', 'facebook');
    formData.append('token', this.authresp.accessToken);
    formData.append('first_name', this.user.first_name);
    formData.append('email', this.user+'@facebook.com');
    formData.append('id_camposanto', '1');

    this._usuarioService.crearUsuarioFB(formData)
    .subscribe((resp:any)=>{
      console.log('success');
    })

  }

  getProfile() {
    this.fb.api('/me?fields=id,name,email,first_name&access_token='+this.authresp.accessToken)
      .then((res: any) => {
        this.user = res;
        console.log(res);
      })
      .catch((error)=> console.log(error));
  }

}
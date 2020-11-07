import { Component, OnInit } from '@angular/core';
import { CamposantoService } from 'src/app/services/camposanto/camposanto.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faDizzy} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from 'src/app/services/navbar/navbar.service'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacebookService, InitParams, LoginOptions, LoginResponse } from 'ngx-facebook';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  camposanto:any = {nombre: ""}
  empresa:any;
  id:any;
  loggeduser=false;
  faIdCard = faIdCard;
  faDizzy = faDizzy;
  faSignOutAlt = faSignOutAlt;
  faBell = faBell;
  displayName: string = "username";
  faFacebookF = faFacebookF;
  public form_login: FormGroup;
  private user: any;
  authresp;

  constructor(
    public _servicio: CamposantoService,
    public _usuario: UsuarioService,
    public router: Router,
    private _navbar: NavbarService,
    private formb: FormBuilder,
    private fb: FacebookService,


    ) { 
      const initParams: InitParams = {
        appId: '921830748297038',
        xfbml: true,
        version: 'v8.0'
      };
  
      fb.init(initParams);
    }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('info'));
    this.cargarCamposanto();
    this.getStatus();
    this.form_login = this.formb.group({
      username: [null, Validators.compose([Validators.required])],
      contrasena: [null, Validators.compose([Validators.required])]
    });
    this.user = {
      username: ' ',
      password: ' '
    };
    this._navbar.updateUsername$.subscribe(
        (message) => {
          console.log(message)
           if(message == "actualizar"){
            this.loadUserInfo();
           }
         }
       )
    if(this.loggeduser){
      this.loadUserInfo();
      
    }
  }


  cargarCamposanto() {
    this._servicio.getCamposantoByID(this.id.camposanto)
      .subscribe((resp: any) => {
        this.camposanto = resp;
        this.cargarEmpresa(resp.id_empresa);

      })
  }

  cargarEmpresa(id){
    this._servicio.getEmpresa(id).subscribe((resp: any) => {
      this.empresa = resp;
    })
  }

  getStatus(){
    // this.loggeduser = this._usuario.isLoggedin;
    this.loggeduser = this._usuario.statusLogin()
    return this.loggeduser;

  }

  logged(){
    this.loggeduser = this._usuario.isLoggedin;
  }

  logout(){
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión.',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '¡Se ha cerrado sesión!',
          'Se ha cerrado la sesión exitosamente'
        )
        this._navbar.recarga_Username('');
        this._usuario.logoutUser();
        this.getStatus();
        this.displayName = "";
        window.location.reload();

        //this.router.navigate(['']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
  }
   
  redirectToProfile(){
    this.router.navigate(['/home/perfil']);
  }

  loadUserInfo(){
    let id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
    this._usuario.getUserInfo(id_usuario).subscribe((resp:any)=>{
      //console.log(resp);
      this.displayName = resp['first_name']+' '+resp['last_name'];
    })
  }

  loginUser(form){
    if(form.invalid){
      return; 
    }
    this.user.username = form.value.username;
    this.user.password = form.value.contrasena;

    this._usuario.loginUser(this.user)
                        .subscribe( resp=>{
                          this._navbar.recarga_Username('actualizar');
                          console.log(resp);
                          console.log('token creado desde componente login')
                          Swal.close();
                          //this.router.navigate([''])
                          window.location.reload();
                          this.form_login.reset();

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

  submit() {
    //console.log(this.form_login.value);
    if(this.form_login.valid){
    this.loginUser(this.form_login);
    Swal.showLoading();
  }else{
    Swal.fire("Error al iniciar sesión", "Por favor asegúrese de llenar los campos correctamente", "error");
  }

  }

  async crearFBuser(authresp: any, user:any) {
    const formData = new FormData();

  
    formData.append('access_token', this.authresp.accessToken);
  
    console.log(formData.get('access_token'));
    this._usuario.loginUsuarioFB(formData)
    .subscribe((resp:any)=>{
      this._navbar.recarga_Username('actualizar');
      console.log(resp)
      let token = JSON.stringify(resp['access']).slice(1,-1);
      let refresh = JSON.stringify(resp['refresh']).slice(1,-1);
      localStorage.setItem('token', token);
      localStorage.setItem('refresh', refresh);
      console.log('success');
    })

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
          this.user = this.getProfile();
          this.router.navigate(['/'])          
        }).then(
          (value:any)=>{
            this.crearFBuser(this.authresp.accessToken, this.user);
          }
        )  
      .catch((error: any) => console.error(error));
  }

  async getProfile() {
    await this.fb.api('/me?fields=id,name,email,first_name,last_name&access_token='+this.authresp.accessToken)
      .then((res: any) => {
        this.user = res;
        console.log(res);
      })
      .catch((error)=> console.log(error));
  }
}

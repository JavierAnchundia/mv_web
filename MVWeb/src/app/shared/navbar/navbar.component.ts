import { Component, OnInit } from '@angular/core';
import { CamposantoService } from 'src/app/services/camposanto/camposanto.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faDizzy} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    public _servicio: CamposantoService,
    public _usuario: UsuarioService,
    public router: Router) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('info'));
    this.cargarCamposanto();
    this.getStatus();
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
        this._usuario.logoutUser();
        this.getStatus();
        this.displayName = "";
        this.router.navigate(['']);
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
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public updateProfile: FormGroup;
  public usuario: any;
  public edit = false;

  skeletonloader = true;
  constructor(
    protected _usuario : UsuarioService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.updateProfile = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      apellidos: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      genero: new FormControl('', Validators.compose([ Validators.minLength(2)])),
      direccion: new FormControl('', Validators.compose([ Validators.minLength(2)])),
      telefono: new FormControl('', Validators.compose([ Validators.minLength(2)])),
    },
    
    );

    
  
  }

  loadUserInfo(){
    let id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
    this._usuario.getUserInfo(id_usuario).subscribe((resp:any)=>{
      this.usuario = resp;
      this.skeletonloader = false;
      this.updateProfile.setValue({
        nombre: this.usuario.first_name,
        apellidos: this.usuario.last_name,
        email: this.usuario.email,
        username: this.usuario.username,
        genero: this.usuario.genero,
        direccion: this.usuario.direccion,
        telefono: this.usuario.telefono
      })
    })
  }

  onSubmit(value){
    const formData = new FormData();

    formData.append('first_name', this.updateProfile.value.nombre);
    formData.append('last_name', this.updateProfile.value.apellidos);
    formData.append('email', this.updateProfile.value.email);
    formData.append('username', this.updateProfile.value.username);
    formData.append('genero', this.updateProfile.value.genero);
    formData.append('direccion', this.updateProfile.value.direccion);
    formData.append('telefono', this.updateProfile.value.telefono);
    
    this._usuario.updateUserProfile(this.usuario['username'],formData).subscribe(
      (resp:any)=>{
        console.log(resp)
      })


  }

  editProfile(){
    this.edit = true;
  }

  cancelEdit(){
    this.edit = false;

  }
}

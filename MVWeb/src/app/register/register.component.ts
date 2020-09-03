import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationValidator } from './registration_validator';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faFacebookF = faFacebookF;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  id:any;
  constructor(public formBuilder: FormBuilder,private  router:  Router,
              public _usuarioService: UsuarioService, ) {
    this.formValidator();
    
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('info'));

  }

  formValidator() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
    }, { validator: RegistrationValidator.validate.bind(this) })

    this.registrationFormGroup = new FormGroup({
      nombre: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      apellidos: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      passwordFormGroup: this.passwordFormGroup
    });
  }
  onSubmitRegisterDetails(value) {
    console.log("FORM VALUE: ", value);
    Swal.showLoading();

    this.registrarUsuario();
  }

  registrarUsuario() {
    if(this.registrationFormGroup.invalid){
      Swal.fire('No se pudo completar el registro')
      return;
    }
    const formData = new FormData();

    formData.append('first_name', this.registrationFormGroup.value.nombre);
    formData.append('last_name', this.registrationFormGroup.value.apellidos);
    formData.append('email', this.registrationFormGroup.value.email);
    formData.append('username', this.registrationFormGroup.value.username);
    formData.append('password', this.passwordFormGroup.value.repeatPassword);
    formData.append('telefono', '');
    formData.append('genero', '');
    formData.append('direccion', '');
    formData.append('estado', 'True');
    formData.append('id_camposanto', this.id.camposanto);
    formData.append('tipo_usuario','uf');

    let usuario = new Usuario(
      this.registrationFormGroup.value.nombre,
      this.registrationFormGroup.value.apellidos,
      this.registrationFormGroup.value.email,
      this.registrationFormGroup.value.username,
      this.passwordFormGroup.value.password,
      true,
      '1'
    );
    
    let registroSatisfactorio = this._usuarioService.crearUsuario(formData)
                        .subscribe(
                          resp=>{
                            console.log(resp);
                            Swal.close();
                            Swal.fire('¡Registro Exitoso!')
                            this.router.navigate(['/home/login']);

                            return true;
                          }, error=>{
                              Swal.fire("Hubo un error en el registro.","Intenta nuevamente");
                              this.registrationFormGroup.reset()
                          }
                        );
    if(registroSatisfactorio){
        this.loadStorageCID(formData.get('username'));
    } else{
      Swal.fire('¡Error!','No se pudo completar tu registro. Intenta nuevamente.')
    }
   
    console.log('Forma valida', this.registrationFormGroup.valid)
    console.log(this.registrationFormGroup.value)
    
   
  }

  loadStorageCID(username){
    localStorage.setItem('username', username);

  }

  
}

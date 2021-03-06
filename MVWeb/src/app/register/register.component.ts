import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationValidator } from './registration_validator';
import { UsuarioService } from '../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faFacebookF = faFacebookF;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  id: any;
  submitted = false;
  f: NgForm;
  usernameLista: any = [];
  emailLista: any = [];
  lista_usuarios: any = [];
  model = {
    titulo: '',
    email: '',
    nombre: '',
    apellido: '',
    cementerio: '',
  };
  paternEmail = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  constructor(public formBuilder: FormBuilder, private router: Router,
              public _usuarioService: UsuarioService, ) {
    this.formValidator();

  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('info'));
    this.obtenerUsuarios();
  }

  formValidator() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
    }, { validator: RegistrationValidator.validate.bind(this) });

    this.registrationFormGroup = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      apellidos: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      passwordFormGroup: this.passwordFormGroup
    },
    {
      validator: [
        this.match_username(),
        this.match_email()
      ],
    }
    );
  }

  get email(){
    return this.registrationFormGroup.get('email');
  }

  onSubmitRegisterDetails(value) {
    this.submitted = true;
    console.log('FORM VALUE: ', value);
    Swal.showLoading();

    this.registrarUsuario();
  }

  registrarUsuario() {
    if (this.registrationFormGroup.invalid) {
      Swal.fire('No se pudo completar el registro');
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
    formData.append('tipo_usuario', 'uf');
    formData.append('is_active', 'true');
    const registroSatisfactorio  = this._usuarioService.crearUsuario(formData)
      .pipe(
        catchError(err => {

          Swal.close();
          Swal.fire(this.errorTranslateHandler(err.error[Object.keys(err.error)[0]][0]) );
          console.log(err.error[Object.keys(err.error)[0]][0]);
          return throwError(err);
      }))
      .subscribe(
        resp => {
          console.log(resp);
          Swal.close();
          Swal.fire('¡Registro Exitoso!');
          this.router.navigate(['/home/']);

        }
      );

    if (registroSatisfactorio) {
      this.loadStorageCID(formData.get('username'));
    } else {
    }

    console.log('Forma valida', this.registrationFormGroup.valid);
    console.log(this.registrationFormGroup.value);


  }

  errorTranslateHandler(error: String){
    switch (error) {
      case 'user with this email address already exists.': {
         return 'Hubo un error al guardar los datos: Ya existe este correo, intente con otro';
      }
      case   'user with this username already exists.'      : {
         return 'Hubo un error al guardar los datos: Ya existe este nombre de usuario, intente con otro';
      }
      default: {
         return 'Hubo un error al guardar los datos';
      }
   }
  }


  loadStorageCID(username) {
    localStorage.setItem('username', username);

  }


  async obtenerUsuarios() {
    await this. _usuarioService
      .getUsersAll()
      .toPromise()
      .then((data: any[]) => {
        this.lista_usuarios = data;
      });
    for (let i = 0; i < this.lista_usuarios.length; i++) {
      console.log(this.lista_usuarios[i]['username']);
      this.usernameLista.push(this.lista_usuarios[i]['username']);
      if (this.lista_usuarios[i]['id_camposanto'] == this.id.camposanto) {
        this.emailLista.push(this.lista_usuarios[i]['email']);
      }
    }
  }

  match_username() {
    // let username = this.adminForm.value.usuario;
    // username = String(username);
    return (formGroup: FormGroup) => {
      let list_username = this.usernameLista;
      const usernameControl = formGroup.controls['username'];
      if (usernameControl.errors && ! usernameControl.errors.match_username) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      if (list_username.includes(usernameControl.value)) {
        usernameControl.setErrors({ usernameMatch: true });
      } else {
        usernameControl.setErrors(null);
      }
    };
  }

  match_email() {
    // let correo_u = this.adminForm.value.correo;
    // correo_u = String(correo_u);
    return (formGroup: FormGroup) => {
      let list_correo = this.emailLista;
      const correoControl = formGroup.controls['email'];
      if (correoControl.errors && ! correoControl.errors.match_email) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      if (list_correo.includes(correoControl.value)) {
        correoControl.setErrors({ correoMatch: true });
      } else {
        correoControl.setErrors(null);
      }
    };
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import URL_SERVICIOS from 'src/app/config/config';
import { RegistrationValidator } from 'src/app/register/registration_validator';
import Swal from 'sweetalert2';
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
  imageSrc: string;
  public archivo: File = null;
  url_backend: String = URL_SERVICIOS.url_backend;
  public nameImagen: string = 'Seleccione un archivo';
  skeletonloader = true;
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  passwordFormGroup: FormGroup;

  constructor(
    protected _usuario: UsuarioService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
    }, { validator: RegistrationValidator.validate.bind(this) });

    this.updateProfile = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      apellidos: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      genero: new FormControl('', Validators.compose([Validators.minLength(2)])),
      direccion: new FormControl('', Validators.compose([Validators.minLength(2)])),
      telefono: new FormControl('', Validators.compose([Validators.minLength(7), Validators.maxLength(10),])),
      fileSource: new FormControl('', [Validators.required])

    },

    );



  }

  loadUserInfo() {
    let id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
    this._usuario.getUserInfo(id_usuario).subscribe((resp: any) => {
      this.usuario = resp;
      if (this.usuario.image_perfil) {
        this.imageSrc = this.usuario.image_perfil;
      }
      this.updateProfile.setValue({
        nombre: this.usuario.first_name,
        apellidos: this.usuario.last_name,
        email: this.usuario.email,
        username: this.usuario.username,
        genero: this.usuario.genero,
        direccion: this.usuario.direccion,
        telefono: this.usuario.telefono,
        fileSource: this.usuario.image_perfil
      });
      this.skeletonloader = false;

    });
  }

  onSubmit(value: any) {
    const formData = new FormData();

    formData.append('first_name', this.updateProfile.value.nombre);
    formData.append('last_name', this.updateProfile.value.apellidos);
    formData.append('email', this.updateProfile.value.email);
    formData.append('genero', this.updateProfile.value.genero);
    formData.append('direccion', this.updateProfile.value.direccion);
    formData.append('telefono', this.updateProfile.value.telefono);
    if(this.archivo != null){
      formData.append('image_perfil', this.archivo);
    }
    if(this.passwordFormGroup.value.password !== ''){
      formData.append('password', this.passwordFormGroup.value.repeatPassword);
      console.log(formData.get('password'));
    }
    Swal.fire({
      title: '¿Desea guardar los cambios a su perfil?',
      text: 'La información del perfil se actualizarán con los nuevos datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this._usuario.updateUserProfile(this.usuario['username'], formData).subscribe(
          (resp: any) => {
            console.log(resp);
            Swal.close();
            Swal.fire(
              'Guardado',
              'El perfil se actualizó con éxito.',
              'success'
            );
            window.location.reload();
          }), ((error: any) => {
            Swal.fire(
              'Error en la actualización.',
              'No se pudo actualizar el perfil. Intente nuevamente',
              'error'
            );
          });

      }
    });



  }

  onFileChange(event: { target: { files: string | any[]; }; }) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      this.archivo = event.target.files[0];
      this.nameImagen = event.target.files[0].name;

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };

    }

  }


  editProfile() {
    this.edit = true;
  }

  cancelEdit() {
    this.edit = false;

  }
}

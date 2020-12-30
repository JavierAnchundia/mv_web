import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {ContactoService} from '../../services/contacto/contacto.service'
import {UsuarioService} from '../../services/usuario/usuario.service'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  nameImagen: string = "Seleccione Imagen (Opcional)";
  archivo: File = null;
  myDate:string = "";
  idUsuario: string;
  public form_contacto: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private _contacto: ContactoService,
    private _usuario: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.form_contacto = this.fb.group({
      nombre: ["", Validators.compose([Validators.required])],
      correo: ["", Validators.compose([Validators.required, Validators.email])],
      imagen: ["",],
      mensaje: ["", Validators.compose([Validators.required, Validators.maxLength(500)])],
      
    });
  }

  submit() {
   if(this.form_contacto.valid && localStorage.getItem('username')){
      this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      console.log(this.myDate);

      this.obtenerIDUser();

  }

  else{
    Swal.fire({
    icon: 'error',
    title: '¡Por favor inicie sesión!',
    });
  }
  }
  
  


  selectFile(event) {
    this.archivo = event.target.files[0];
    this.nameImagen = event.target.files[0].name;
  }

  async obtenerIDUser(){

    this._usuario.obtenerUserInfo(localStorage.getItem('username'))
    .pipe(
      catchError(err => {
        
        Swal.close()
        Swal.fire(        
          {
            icon: 'error',
            title: this.errorTranslateHandler(err.error[Object.keys(err.error)[0]][0]),
          });
      
        console.log(err.error[Object.keys(err.error)[0]][0]);
        return throwError(err);
    }))
    .subscribe(
      (data) => {
        this.idUsuario = data['id'];
        this.postContacto();
        
      }, error =>{
        console.error('Error:' + error);
                    
        return throwError(error);
      })
  }

  
  async postContacto() {
    const contacto = new FormData();
    if(this.archivo){contacto.append('imagen', this.archivo);
    console.log("Tobirama")}
    contacto.append('mensaje', this.form_contacto.value.mensaje);
    contacto.append('fecha_emision', this.myDate);
    contacto.append('id_camposanto', JSON.parse(localStorage.getItem('info')).camposanto);
    contacto.append('id_usuario', this.idUsuario);
       
    var object = {};
    contacto.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    console.log(contacto.get('imagen'));
    console.log(contacto.get('mensaje'));
    console.log(contacto.get('fecha_emision'));
    console.log(contacto.get('id_camposanto'));
    console.log(contacto.get('id_usuario'));

    await this._contacto.postContacto(contacto)
    .pipe(
      catchError(err => {
        
        Swal.close()
        Swal.fire(        
          {
            icon: 'error',
            title: this.errorTranslateHandler(err.error[Object.keys(err.error)[0]][0]),
          });
      
        console.log(err.error[Object.keys(err.error)[0]][0]);
        return throwError(err);
    }))
    .subscribe(
      (data) => {
        console.log(data);
        
        Swal.close();
        Swal.fire("Mensaje enviado existosamente")
      }, error =>{
        console.error('Error:' + error);
                    
        return throwError(error);
      })
  }

  errorTranslateHandler(error:String){
    switch(error) { 
      case "camposanto with this email address already exists.": { 
         return "Hubo un error al guardar los datos: Ya existe este correo, intente con otro";
      } 
      case   "camposanto with this nombre already exists."      : { 
         return "Hubo un error al guardar los datos: Ya existe este nombre de camposanto, intente con otro"      
      } 
      default: { 
         return "Hubo un error"
      } 
   } 
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RecuperarContrasenaService } from '../services/recuperar-contrasena/recuperar-contrasena.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],
  
})
export class PasswordRecoveryComponent implements OnInit {

  public recuperar_form: FormGroup;
  constructor(
    private formb: FormBuilder,
    public _recuperarContrasena: RecuperarContrasenaService,
    private router: Router,



  ){ }

  ngOnInit(): void {

    this.recuperar_form = this.formb.group({
      correo: [null, Validators.compose([Validators.required])],
    });

  }

  onSubmit() {
    if (this.recuperar_form.valid) {
      Swal.showLoading(
        
      );
      this.recuperarContrasena();
    }
    
  }

  recuperarContrasena() {
    console.log(this.recuperar_form.value.correo);
    let id_cementerio = JSON.parse(localStorage.getItem('info')).camposanto.toString()
    this._recuperarContrasena
    .recuperarContrasenaCorreo(this.recuperar_form.value.correo, id_cementerio)
    .pipe(
     catchError((err) => {
      Swal.close();
      if(err.error[Object.keys(err.error)[0]] == 'Not found.') {
        Swal.fire({
          title: 'No existe ese correo, intente nuevemente',
          heightAuto: false,
          backdrop:false,
          animation: false,
          })}
      else{
       Swal.fire({
        heightAuto: false,
        backdrop:false,
        title:this.errorTranslateHandler(err.error[Object.keys(err.error)[0]][0])}
       );}
       console.log(err.error);

       return throwError(err);
     })
   )
   .subscribe(
     async (resp: any) => {
      
       
       Swal.close();
       Swal.fire({
        heightAuto: false,
        backdrop:false,
        title:'¡Petición Exitosa! Revise su correo por favor',
        confirmButtonText: 'Ok',
        }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/home/']);
        } 
        })

       console.log("Holi");
       return true;
     },
     (error) => {
       console.error('Error:' + error);
       return throwError(error);
     },
     () => console.log('HTTP request completed.')
   );  
  
  
  }

   errorTranslateHandler(error: String) {
    switch (error) {
     
      case 'Not found.':{
        return 'No existe ese usuario, intente nuevemente '
      }
      default: {
        return 'Hubo un error intente nuevamente';
      }
    }
  }




}

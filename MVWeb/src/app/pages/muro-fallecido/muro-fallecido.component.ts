import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DifuntoService } from '../../services/difunto/difunto.service';
import { Difunto } from 'src/app/models/difunto.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser'
import { HomenajeService } from '../../services/homenaje/homenaje.service';
import { DatePipe } from '@angular/common'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal/modal.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-muro-fallecido',
  templateUrl: './muro-fallecido.component.html',
  styleUrls: ['./muro-fallecido.component.css']
})
export class MuroFallecidoComponent implements OnInit {
  imagePost: boolean = false;
  textPost: boolean = true;
  videoPost: boolean = false;
  audioPost: boolean = false;
  rosePost: boolean = false;
  audioSrc;

  //Atributos para progress bar
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;

  loggeduser = false;

  public params;
  public difuntoID;
  public difunto: Difunto;
  public homenajes: [] = [];
  public date;
  public archivo: File = null;
  public nameImagen: string = "Seleccione un archivo";
  public numRosas: Number = 0;
  public historial: [] = [];
  imageSrc: string;

  myForm = new FormGroup({
    message: new FormControl('', [Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _difunto: DifuntoService,
    public _usuario: UsuarioService,
    protected sanitizer: DomSanitizer,
    private homenaje: HomenajeService,
    public datepipe: DatePipe,
    public matDialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getRouteParams();
    this.getDifuntoInfo();
    this.getHomenajes();
    this.logrosas();
  }

  getRouteParams(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params
    });

    this.difuntoID = this.params.difuntoID;

    console.log("this.difuntoID", this.difuntoID);
  }

  get f() {
    return this.myForm.controls;
  }

  getDifuntoInfo() {
    this._difunto.getDifuntoByID(this.difuntoID).subscribe(
      (resp: any) => {
        console.log(resp);
        this.difunto = resp;
        this.numRosas = resp['num_rosas'];
      }
    ), (error) => {
      console.log(error);
    }
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      this.archivo = event.target.files[0];
      this.nameImagen = event.target.files[0].name;
      
      reader.onload = () => {

        this.imageSrc = reader.result as string;
        this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(this.imageSrc);

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };

    }

  }

  getStatus() {
    // this.loggeduser = this._usuario.isLoggedin;
    this.loggeduser = this._usuario.statusLogin()
    return this.loggeduser;
  }

  async submit() {
    this.getStatus();
    if (!this.loggeduser) {
      Swal.fire({
        icon: 'error',
        title: 'Acción denegada',
        text: 'Inicia sesión para poder publicar.',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<a href="#/home/login" style="color:white;">Iniciar Sesion</a>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<a href="#/home/register">Registrarse</a>',
        cancelButtonAriaLabel: 'Thumbs down'
      })
    } else {
      await this.upload();
      if (this.textPost) {
        this.postMensaje();
      }
      else if (this.imagePost) {
        this.postImagen();
      }
      else if (this.videoPost) {
        this.postVideo();
      }
      else if (this.audioPost) {
        this.postAudio();
      }
    }
  }

  async postMensaje() {
    const mensaje = new FormData();
    mensaje.append('mensaje', this.myForm.value.message as string);

    await this.homenaje.postMensajes(mensaje)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }))
      .subscribe(
        (data) => {
          console.log(data);
          let fecha = this.getFechaPublicacion();
          let id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
          const homenajePost = new FormData();

          homenajePost.append('id_usuario', id_usuario as string);
          homenajePost.append('id_difunto', this.difuntoID as string);
          homenajePost.append('fecha_publicacion', fecha as string);
          homenajePost.append('estado', 'True');
          homenajePost.append('likes', '0');
          homenajePost.append('id_textcontent', data['id_mensaje']);

          console.log(homenajePost);

          this.postHomenaje(homenajePost);


        }, error => {
          console.error('Error:' + error);

          return throwError(error);
        })
  }

  async postImagen() {
    //this.upload();

    const Himagen = new FormData();
    Himagen.append('mensaje', this.myForm.value.message as string);
    Himagen.append('imagen', this.archivo);

    await this.homenaje.postImagen(Himagen)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }))
      .subscribe(
        (data) => {
            /* if (data.type === HttpEventType.UploadProgress) {
              console.log("total archivo",data.total)
              this.progress = Math.round(100 * data.loaded / (data.total));
            } else if (data instanceof HttpResponse) {
              this.message = data.body.message;
            } */

          console.log(data);
          let fecha = this.getFechaPublicacion();
          let id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
          const homenajePost = new FormData();

          homenajePost.append('id_usuario', id_usuario as string);
          homenajePost.append('id_difunto', this.difuntoID as string);
          homenajePost.append('fecha_publicacion', fecha as string);
          homenajePost.append('estado', 'True');
          homenajePost.append('likes', '0');
          homenajePost.append('id_imagecontent', data['id_imagen']);

          console.log(homenajePost);

          this.postHomenaje(homenajePost);


        }, error => {
          console.error('Error:' + error);

          return throwError(error);
        })
  }

  async postVideo() {
    //this.upload();

    const Hvideo = new FormData();
    Hvideo.append('mensaje', this.myForm.value.message as string);
    Hvideo.append('video', this.archivo);

    await this.homenaje.postVideo(Hvideo)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }))
      .subscribe(
        (data) => {

          console.log(data);
          let fecha = this.getFechaPublicacion();
          let id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
          const homenajePost = new FormData();

          homenajePost.append('id_usuario', id_usuario as string);
          homenajePost.append('id_difunto', this.difuntoID as string);
          homenajePost.append('fecha_publicacion', fecha as string);
          homenajePost.append('estado', 'True');
          homenajePost.append('likes', '0');
          homenajePost.append('id_videocontent', data['id_video']);

          console.log(homenajePost);

          this.postHomenaje(homenajePost);


        }, error => {
          console.error('Error:' + error);

          return throwError(error);
        })
  }

  async postAudio() {
  //this.upload();

    const Haudio = new FormData();
    Haudio.append('mensaje', this.myForm.value.message as string);
    Haudio.append('audio', this.archivo);
    this.progress = 0;

    await this.homenaje.postAudio(Haudio)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }))
      .subscribe(
        (data) => {
          if (data.type === HttpEventType.UploadProgress) {
            console.log("total archivo",data.total)
            this.progress = Math.round(100 * data.loaded / (data.total));
          } else if (data instanceof HttpResponse) {
            this.message = data.body.message;
          }
          Swal.showLoading();
          console.log(data);
          let fecha = this.getFechaPublicacion();
          let id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
          const homenajePost = new FormData();

          homenajePost.append('id_usuario', id_usuario as string);
          homenajePost.append('id_difunto', this.difuntoID as string);
          homenajePost.append('fecha_publicacion', fecha as string);
          homenajePost.append('estado', 'True');
          homenajePost.append('likes', '0');
          homenajePost.append('id_audiocontent', data['id_audio']);

          this.postHomenaje(homenajePost);


        }, error => {
          console.error('Error:' + error);

          return throwError(error);
        })
  }


  postHomenaje(homenaje) {
    this.homenaje.postHomenaje(homenaje).subscribe((resp: any) => {
      Swal.close();
      this.myForm.reset();
      this.getHomenajes();
      console.log("success");
      this.imageSrc='';
      this.audioSrc = "";
      
    })
  }

  selectImg() {
    this.imagePost = true;
    this.textPost = false;
    this.videoPost = false;
    this.audioPost = false;
    this.rosePost = false;
  }

  selectVideo() {
    this.imagePost = false;
    this.textPost = false;
    this.videoPost = true;
    this.audioPost = false;
    this.rosePost = false;
  }

  selectRosa() {
    this.imagePost = false;
    this.textPost = false;
    this.videoPost = false;
    this.audioPost = false;
    this.rosePost = true;
  }

  selectAudio() {
    this.imagePost = false;
    this.textPost = false;
    this.videoPost = false;
    this.audioPost = true;
    this.rosePost = false;
  }

  onEnded(event) {

  }

  getHomenajes() {
    this.homenaje.getHomenajesByID(this.difuntoID).subscribe(
      (resp: any) => {
        console.log(resp);
        this.homenajes = resp;
        this.homenajes.reverse();

      })
  }

  getFechaPublicacion() {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    return latest_date;
  }

  postRosa() {
    this.homenaje.dejarRosa(this.difuntoID).subscribe((resp: any) => {
      this.getDifuntoInfo();
      console.log(resp);

    })
  }

  async saveLogRosa() {
    this.getStatus();
    if (!this.loggeduser) {
      Swal.fire({
        icon: 'error',
        title: 'Acción denegada',
        text: 'Inicia sesión para poder publicar.',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<a href="#/home/login" style="color:white;">Iniciar Sesion</a>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<a href="#/home/register">Registrarse</a>',
        cancelButtonAriaLabel: 'Thumbs down'
      })
    } else {
      const log = new FormData();
      let fecha = this.getFechaPublicacion();
      let id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
      console.log(id_usuario)
      log.append('id_difunto', this.difuntoID as string);
      log.append('id_usuario', id_usuario as string);
      log.append('fecha_publicacion', fecha as string);


      await this.homenaje.postRegistroRosa(log)
        .pipe(
          catchError(err => {
            console.log(err);
            return throwError(err);
          }))
        .subscribe(
          (data) => {
            console.log("rosa")

            this.postRosa();
            this.logrosas();

          }, error => {
            console.error('Error:' + error);

            return throwError(error);
          })
    }
  }

  logrosas() {
    this.homenaje.getLogRosas(this.difuntoID).subscribe((resp: any) => {
      console.log(resp);
      this.historial = resp.reverse();
    })
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "450px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      historial: this.historial
    }
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  //Métodos para progress bar
  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
  
    this.currentFile = this.archivo;
    this.homenaje.uploadVideo(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("total archivo",event.total)
          this.progress = Math.round(100 * event.loaded / (event.total));
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        Swal.showLoading();
        this.progress = 0;
        this.currentFile = undefined;
        
      });
    this.selectedFiles = undefined;
  }
}

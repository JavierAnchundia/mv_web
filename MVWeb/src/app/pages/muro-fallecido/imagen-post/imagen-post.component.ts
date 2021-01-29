import { Component, OnInit, Input } from '@angular/core';
import URL_SERVICIOS from 'src/app/config/config';
import { HomenajeService } from 'src/app/services/homenaje/homenaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imagen-post',
  templateUrl: './imagen-post.component.html',
  styleUrls: ['./imagen-post.component.css']
})
export class ImagenPostComponent implements OnInit {
  @Input() author_first_name: string;
  @Input() author_last_name: string;
  @Input() dateCreated: Date;
  @Input() message: String;
  @Input() imagen: String;
  @Input() author_id: String;
  @Input() user_id: String;
  @Input() post_id: String;
  @Input() gratuito;


  url_backend: String = URL_SERVICIOS.url_backend;

  constructor(
    public _homenaje: HomenajeService,

  ) { }

  ngOnInit(): void {
  }

  submit() {
    Swal.fire({
      title: '¿Está seguro que desea eliminar la publicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this.borrarImagen();
      }
    })
  }
  borrarImagen() {
    this._homenaje.deleteImagen(this.post_id).subscribe(
      (data: any) => {
        Swal.close();
        Swal.fire(
          'Publicación eliminada',
          'Su publicación se eliminó con éxito',
          'success'
        )
        window.location.reload();

      }, (error => {
        Swal.fire(
          'Error al eliminar',
          'Intente más tarde',
          'error'
        )
      })
    )
  }

}

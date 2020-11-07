import { Component, OnInit, Input } from '@angular/core';
import { HomenajeService } from '../../../services/homenaje/homenaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.css']
})
export class TextPostComponent implements OnInit {
  @Input() author_first_name: string;
  @Input() author_last_name: string;
  @Input() dateCreated: Date;
  @Input() message: String;
  @Input() author_id: String;
  @Input() user_id: String;
  @Input() post_id: String;

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
        this.borrarMensaje();
      }
    })
  }
  borrarMensaje() {
    this._homenaje.deleteMensaje(this.post_id).subscribe(
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

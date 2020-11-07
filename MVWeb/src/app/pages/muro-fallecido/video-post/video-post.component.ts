import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import URL_SERVICIOS from 'src/app/config/config';
import { HomenajeService } from '../../../services/homenaje/homenaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video-post',
  templateUrl: './video-post.component.html',
  styleUrls: ['./video-post.component.css']
})
export class VideoPostComponent implements OnInit {
  @Input() author_first_name: string;
  @Input() author_last_name: string;
  @Input() dateCreated: Date;
  @Input() message: String;
  @Input() video: String;
  @Input() author_id: String;
  @Input() user_id: String;
  @Input() post_id: String;

  videoURL;
  url_backend: String = URL_SERVICIOS.url_backend;

  constructor(
    protected sanitizer: DomSanitizer,
    public _homenaje: HomenajeService,

  ) { }

  ngOnInit(): void {
    const reader = new FileReader();
    let url = URL_SERVICIOS.url_backend + this.video;
    this.videoURL = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onEnded(event){

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
        this.borrarVideo();
      }
    })
  }

  borrarVideo() {
    this._homenaje.deleteVideo(this.post_id).subscribe(
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

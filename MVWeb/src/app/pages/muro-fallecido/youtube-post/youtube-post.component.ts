import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import URL_SERVICIOS from 'src/app/config/config';
import { HomenajeService } from '../../../services/homenaje/homenaje.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-youtube-post',
  templateUrl: './youtube-post.component.html',
  styleUrls: ['./youtube-post.component.css']
})
export class YoutubePostComponent implements OnInit {
  @Input() author_first_name: string;
  @Input() author_last_name: string;
  @Input() dateCreated: Date;
  @Input() message: String;
  @Input() video: String;
  @Input() author_id: String;
  @Input() user_id: String;
  @Input() post_id: String;

  constructor(
    public homenaje: HomenajeService,
  ) { }

  ngOnInit(): void {
    console.log(this.video)
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
      }
    })
  }

}

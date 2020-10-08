import { Component, OnInit, Input } from '@angular/core';
import URL_SERVICIOS from 'src/app/config/config';

@Component({
  selector: 'app-imagen-post',
  templateUrl: './imagen-post.component.html',
  styleUrls: ['./imagen-post.component.css']
})
export class ImagenPostComponent implements OnInit {
  @Input() author_first_name: String;
  @Input() author_last_name: String;
  @Input() dateCreated: Date;
  @Input() message: String;
  @Input() likes: String;
  @Input() imagen: String;

  url_backend: String = URL_SERVICIOS.url_backend;
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import URL_SERVICIOS from 'src/app/config/config';

@Component({
  selector: 'app-video-post',
  templateUrl: './video-post.component.html',
  styleUrls: ['./video-post.component.css']
})
export class VideoPostComponent implements OnInit {
  @Input() author_first_name: String;
  @Input() author_last_name: String;
  @Input() dateCreated: Date;
  @Input() message: String;
  @Input() likes: String;
  @Input() video: String;
  
  url_backend: String = URL_SERVICIOS.url_backend;

  constructor() { }

  ngOnInit(): void {
    console.log(this.video);
  }

  onEnded(event){

  }

}

import { Component, OnInit, Input } from '@angular/core';
import URL_SERVICIOS from 'src/app/config/config';

@Component({
  selector: 'app-audio-post',
  templateUrl: './audio-post.component.html',
  styleUrls: ['./audio-post.component.css']
})
export class AudioPostComponent implements OnInit {
  @Input() author_first_name: String;
  @Input() author_last_name: String;
  @Input() dateCreated: Date;
  @Input() message: String;
  @Input() likes: String;
  @Input() audio: String;
  
  url_backend: String = URL_SERVICIOS.url_backend;

  constructor() { }

  ngOnInit(): void {
  }

}

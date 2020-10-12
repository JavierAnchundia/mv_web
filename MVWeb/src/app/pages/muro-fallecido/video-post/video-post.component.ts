import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  videoURL;
  url_backend: String = URL_SERVICIOS.url_backend;

  constructor(
    protected sanitizer: DomSanitizer,

  ) { }

  ngOnInit(): void {
    const reader = new FileReader();
    let url = URL_SERVICIOS.url_backend + this.video;
    console.log(url);
    this.videoURL = this.sanitizer.bypassSecurityTrustUrl(url);
    console.log(this.video);
  }

  onEnded(event){

  }

}

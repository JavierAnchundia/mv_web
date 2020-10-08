import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.css']
})
export class TextPostComponent implements OnInit {
  @Input() author_first_name: String;
  @Input() author_last_name: String;
  @Input() dateCreated: Date;
  @Input() message: String;
  @Input() likes: String;
  
  constructor() { }

  ngOnInit(): void {
  }

}

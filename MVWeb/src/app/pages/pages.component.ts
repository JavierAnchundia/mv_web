import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

 
  id:any;
  constructor() { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('info'));

  }

  
}

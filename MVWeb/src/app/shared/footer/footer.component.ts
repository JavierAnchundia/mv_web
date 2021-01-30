import { Component, OnInit } from '@angular/core';
import { CamposantoService } from 'src/app/services/camposanto/camposanto.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private id: any;
  public redes: any;

  constructor(
    private camposanto: CamposantoService,
  ) {
    this.id = JSON.parse(localStorage.getItem('info'));
   }

  ngOnInit(): void {
    this.cargarRedes();
  }

  cargarRedes(){
    this.camposanto.getRedes(this.id.camposanto).subscribe(
      (data: any) => {
        this.redes = data;
        console.log(data);
      }
    )
  }

}

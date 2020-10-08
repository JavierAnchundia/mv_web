import { Component ,OnInit} from '@angular/core';
import { CamposantoService } from './services/camposanto/camposanto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Mapa Virtual Usuario Final';
  camposanto: any;
  empresa: any;
  data = '1'; //ESTE NUMERO SE CAMBIA DE ACUERDO AL CEMENTERIO DEL QUE SE QUIERA CARGAR LA PAGINA WEB

  constructor(public _servicio: CamposantoService) { }

  ngOnInit(){
    this.cargarCamposanto();
  }


  cargarCamposanto() {
    this._servicio.getCamposantoByID(this.data)
      .subscribe((resp: any) => {
        
        this.camposanto = resp;
        this.cargarEmpresa(resp.id_empresa);

      })
  }

  cargarEmpresa(id){
    this._servicio.getEmpresa(id).subscribe((resp: any) => {
      this.empresa = resp;
      localStorage.setItem('info', JSON.stringify({camposanto: this.camposanto['id_camposanto'],nombre:this.camposanto['nombre'], empresa: this.empresa['id_empresa']}));
    })
  }
}

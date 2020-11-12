import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TiposepulturaService } from 'src/app/services/tiposepultura/tiposepultura.service';
import { FavoritosService } from '../../services/favoritos/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  private id_usuario;
  public favoritos_lista;
  public lista_sepultura;
  public id:any;

  constructor(
    private _favorito : FavoritosService,
    private router: Router,
    public _sepultura: TiposepulturaService,
  ) { }

  ngOnInit(): void {
    this.id_usuario = JSON.parse(localStorage.getItem('id'))['user_id'];
    this.id = JSON.parse(localStorage.getItem('info'));

    this.getFavoritos();
  }

  getFavoritos(){
    this._favorito.obtenerFavoritos(this.id_usuario).subscribe(
      (data:any)=>{
        this.favoritos_lista = data;
      }
    )
  }

  redirectDifuntoProfile(value){
    console.log("click aquí");
    let difuntoId = value.difuntoID;
    console.log(difuntoId)
    let data = {'difuntoID':difuntoId}
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "difuntoID": JSON.stringify(data.difuntoID)
          
      }
    };
    this.router.navigate(["home/muro"],  navigationExtras);
  }

  cargarSepultura() {
    this._sepultura.getSepultura(this.id.camposanto)
      .subscribe((resp: any) => {
        this.lista_sepultura = resp;
      })
  }
}

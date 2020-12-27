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
  private id_usuario: any;
  public favoritos_lista: any;
  public lista_sepultura: any;
  public id: any;

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
      (data: any) => {
        this.favoritos_lista = data.reverse();
      }
    )
  }

  redirectDifuntoProfile(value){
    const difuntoId = value.difuntoID;
    const data = {difuntoID: difuntoId}
    const navigationExtras: NavigationExtras = {
      queryParams: {
          difuntoID: JSON.stringify(data.difuntoID)

      }
    };
    this.router.navigate(['home/muro'],  navigationExtras);
  }
}

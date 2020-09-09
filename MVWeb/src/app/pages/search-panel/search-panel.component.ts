import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DifuntoService } from 'src/app/services/difunto/difunto.service';
import { SectorService } from 'src/app/services/sector/sector.service';
import { TiposepulturaService } from '../../services/tiposepultura/tiposepultura.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Difunto } from 'src/app/models/difunto.model';

export interface difunto {
  nombre: string;
  position: number;
  apellidos: string;
  fechaDefuncion: string;
  sector: string;
  lapida: number;
  tipoSepultura: string;

}



@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['cedula','nombre', 'apellidos','fechaNacimiento' ,'fecha_difuncion', 'lapida'];
  searchFG: FormGroup;
  lista_resultados:any;
  lista_sector: any;
  lista_sepultura: any;
  sepulturaOption:any;
  sectorOption: string;
  id:any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public dataSource = new MatTableDataSource<Difunto>();

  constructor(public formBuilder: FormBuilder, 
    public _difunto: DifuntoService, 
    public _sector: SectorService, 
    public _sepultura: TiposepulturaService,
    public router: Router,
    ) {
    this.searchFG = new FormGroup({
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      tipoSepultura: new FormControl(''),
      sector: new FormControl(''),
      fechaDefuncionStart: new FormControl(''),
      fechaDefuncionEnd: new FormControl(''),
      noLapida: new FormControl('')

    });
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('info'));
    this.cargarSector();
    this.cargarSepultura();
  }

  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
  }

  onSubmit(value) {
    Swal.showLoading();
    this.lista_resultados = [];
    this._difunto.getDifuntos(this.id.camposanto, value.nombres, value.apellidos)
      .subscribe((resp: any) =>{

        console.log(resp);
        this.lista_resultados = resp;
        this.dataSource.data = resp as Difunto[];
        console.log(this.dataSource.data.length)
        Swal.close()
        if(this.dataSource.data.length == 0){
          Swal.fire('No se encontraron coincidencias.','Intente nuevamente.')
        }
      }
    )
  }

  cargarSector() {
    this._sector.getSector(this.id.camposanto)
      .subscribe((resp: any) => {
        this.lista_sector = resp;

      })
  }

  cargarSepultura() {
    this._sepultura.getSepultura(this.id.camposanto)
      .subscribe((resp: any) => {
        this.lista_sepultura = resp;
      })
  }

  onChangeSepultura(value) {
    this.sepulturaOption = value;
    console.log(this.sepulturaOption);
  }

  onChangeSector(value) {
    this.sectorOption = value;
    console.log(this.sectorOption);
  }

  getRecord(row){
    this.router.navigate(['/404']);
    console.log(row);

  }

  sortData(event) {
    const data = this.lista_resultados.slice();
    if (!this.sort.active || this.sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = this.lista_resultados.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        
        case 'date': return this.compare(a.date, b.date, isAsc);
        default: return 0;
      }
    });
    
  }
  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
    
}

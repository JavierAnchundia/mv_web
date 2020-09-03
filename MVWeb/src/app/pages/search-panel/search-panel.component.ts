import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DifuntoService } from 'src/app/services/difunto/difunto.service';
import { SectorService } from 'src/app/services/sector/sector.service';
import { TiposepulturaService } from '../../services/tiposepultura/tiposepultura.service';
import { Camposanto } from '../../../../../../ADMIN/MVAdmin/src/app/models/camposanto.model';
import { Router } from '@angular/router';

export interface difunto {
  nombre: string;
  position: number;
  apellidos: string;
  fechaDefuncion: string;
  sector: string;
  lapida: number;
  tipoSepultura: string;

}

const ELEMENT_DATA: difunto[] = [
  { position: 1, nombre: 'Hydrogen', lapida: 1.0079, apellidos: 'H', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 2, nombre: 'Helium', lapida: 4.0026, apellidos: 'He', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 3, nombre: 'Lithium', lapida: 6.941, apellidos: 'Li', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 4, nombre: 'Beryllium', lapida: 9.0122, apellidos: 'Be', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 5, nombre: 'Boron', lapida: 10.811, apellidos: 'B', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 6, nombre: 'Carbon', lapida: 12.0107, apellidos: 'C', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 7, nombre: 'Nitrogen', lapida: 14.0067, apellidos: 'N', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 8, nombre: 'Oxygen', lapida: 15.9994, apellidos: 'O', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 9, nombre: 'Fluorine', lapida: 18.9984, apellidos: 'F', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
  { position: 10, nombre: 'Neon', lapida: 20.1797, apellidos: 'Ne', sector: 'Tierra', tipoSepultura: 'Bóveda', fechaDefuncion: '12/12/1999' },
];

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {

  displayedColumns: string[] = ['cedula','nombre', 'apellidos','fechaNacimiento' ,'fechaDefuncion', 'lapida'];
  dataSource;
  searchFG: FormGroup;
  lista_resultados:any;
  lista_sector: any;
  lista_sepultura: any;
  sepulturaOption:any;
  sectorOption: string;
  id:any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
      fechaDefuncion: new FormControl(''),
      noLapida: new FormControl('')

    });
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('info'));
    this.cargarSector();
    this.cargarSepultura();
  }

  onSubmit(value) {
    console.log("FORM VALUE: ", value);
    this.lista_resultados = [];
    this._difunto.getDifuntos(this.id.camposanto, value.nombres, value.apellidos)
      .subscribe((resp: any) =>{
        console.log(resp);
        this.lista_resultados = resp;
        this.dataSource = new MatTableDataSource(this.lista_resultados);
        if(this.lista_resultados == 0){
          alert("No se encontraron coincidencias.")
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
    
}

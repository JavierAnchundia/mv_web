import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DifuntoService } from 'src/app/services/difunto/difunto.service';
import { SectorService } from 'src/app/services/sector/sector.service';
import { TiposepulturaService } from '../../services/tiposepultura/tiposepultura.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Difunto } from 'src/app/models/difunto.model';
import { NavigationExtras } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
  providers: [
    /* {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }, */

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class SearchPanelComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['cedula', 'nombre', 'apellidos', 'fechaNacimiento', 'fecha_difuncion', 'lapida', 'detalle'];
  searchFG: FormGroup;
  lista_resultados: any;
  lista_sector: any;
  lista_sepultura: any;
  sepulturaOption: any;
  sectorOption: string;
  id: any;
  public desde = null;
  public hasta = null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public dataSource = new MatTableDataSource<Difunto>();

  constructor(public formBuilder: FormBuilder,
              public _difunto: DifuntoService,
              public _sector: SectorService,
              public _sepultura: TiposepulturaService,
              public router: Router,
              public route: ActivatedRoute,
  ) {
    this.searchFG = new FormGroup({
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      tipoSepultura: new FormControl(null),
      sector: new FormControl(null),
      fechaDefuncionStart: new FormControl(''),
      fechaDefuncionEnd: new FormControl(''),
      noLapida: new FormControl(null)

    });
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('info'));
    this.cargarSector();
    this.cargarSepultura();
    this.route.queryParams.subscribe(params => {
      if (params.r) {
        this.getRecargarTable();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async getRecargarTable() {
    Swal.showLoading();
    this.dataSource = new MatTableDataSource<Difunto>();
    this.lista_resultados = [];
    const nombre = localStorage.getItem('nombres_difunto');
    const apellido = localStorage.getItem('apellidos_difunto');
    await this._difunto.getDifuntos(this.id.camposanto, nombre, apellido, this.desde, this.hasta, this.searchFG.value.noLapida, this.searchFG.value.sector, this.searchFG.value.tipoSepultura)
      .subscribe((resp: any) => {
        console.log(resp);
        this.lista_resultados = resp;
        this.dataSource.data = resp as Difunto[];
        console.log(this.dataSource.data.length, this.dataSource.data);
        console.log(this.dataSource.data.length);
        Swal.close();
        if (this.dataSource.data.length === 0) {
          Swal.fire('No se encontraron coincidencias.', 'Intente nuevamente.');
        }
      }
      );
  }

  delay() {
    setTimeout(() => {
      this.getRecargarTable();
    }, 1000);
  }

  formatDay(day: any){
    if (day <= 9  ){
      return '0' + day;
    }
    return String(day);
  }
  onSubmit(value) {
    console.log(value);
    const desdeFull = value.fechaDefuncionStart !== '' && value.fechaDefuncionStart != null;
    const hastaFull = value.fechaDefuncionEnd !== '' && value.fechaDefuncionEnd != null;
    const lapidaEmpty = value.noLapida === '';
    const lapidaNull = value.noLapida === null;
    const nameEmpty = value.nombres === null;
    const lnameEmpty = value.apellidos === null;
    const sectorEmpty = value.sector === null;
    const tipoEmpty = value.tipoSepultura === null;

    if (desdeFull){
      this.desde = value.fechaDefuncionStart._i.year + '-' + (value.fechaDefuncionStart._i.month + 1) + '-' + this.formatDay(value.fechaDefuncionStart._i.date);
    }else{
      this.desde = null;
    }
    if (hastaFull){
      this.hasta = value.fechaDefuncionEnd._i.year + '-' + (value.fechaDefuncionEnd._i.month + 1) + '-' + this.formatDay(value.fechaDefuncionEnd._i.date);
    }else{
      this.hasta = null;
    }
    if (lapidaEmpty){
      value.noLapida = null;
    }
    if (value.nombres === ''){
        value.nombres = null;
    }
    if (value.apellidos === ''){
      value.apellidos = null;
    }

    Swal.showLoading();
    this.lista_resultados = [];
    if (((nameEmpty || lnameEmpty) && !desdeFull && !hastaFull && lapidaNull && sectorEmpty && tipoEmpty) ) {
      Swal.fire('Búsqueda fallida', 'Por favor completar nombre y apellido para realizar la búsqueda.', 'warning');
    } else if ((new Date(this.hasta) < new Date(this.desde)) || (desdeFull && !hastaFull) || (!desdeFull && hastaFull) ){
      Swal.fire('Datos no válidos', 'Seleccione un rango de fechas válido', 'error');
    }
    else {
      this._difunto.getDifuntos(this.id.camposanto, value.nombres, value.apellidos, this.desde, this.hasta, value.noLapida, value.sector, value.tipoSepultura)
        .subscribe((resp: any) => {
          localStorage.setItem('nombres_difunto', value.nombres);
          localStorage.setItem('apellidos_difunto', value.apellidos);
          console.log(resp);
          this.lista_resultados = resp;
          this.dataSource.data = resp as Difunto[];
          console.log(this.dataSource.data.length);
          Swal.close();
          if (this.dataSource.data.length === 0) {
            Swal.fire('No se encontraron coincidencias.', 'Intente nuevamente.');
          }
        }
        );
    }
  }

  cargarSector() {
    this._sector.getSector(this.id.camposanto)
      .subscribe((resp: any) => {
        this.lista_sector = resp;

      });
  }

  cargarSepultura() {
    this._sepultura.getSepultura(this.id.camposanto)
      .subscribe((resp: any) => {
        this.lista_sepultura = resp;
      });
  }

  onChangeSepultura(value) {
    this.sepulturaOption = value;
    console.log(this.sepulturaOption);
  }

  onChangeSector(value) {
    this.sectorOption = value;
    console.log(this.sectorOption);
  }

  getRecord(row) {
    console.log(row);

  }

  redirectDifuntoProfile(value) {
    const difuntoId = value.difuntoID;
    console.log(difuntoId);
    const data = { difuntoID: difuntoId };
    const navigationExtras: NavigationExtras = {
      queryParams: {
        difuntoID: JSON.stringify(data.difuntoID)

      }
    };
    this.router.navigate(['home/muro'], navigationExtras);
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

  limpiarFiltros(){
    this.searchFG.setValue(
      {
      nombres: null,
      apellidos: null,
      tipoSepultura: null,
      sector: null,
      fechaDefuncionStart: '',
      fechaDefuncionEnd: '',
      noLapida: null
      }
    );
    this.desde = null;
    this.hasta = null;
  }
}
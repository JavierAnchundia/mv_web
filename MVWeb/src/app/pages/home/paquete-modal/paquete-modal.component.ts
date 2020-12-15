import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import URL_SERVICIOS from 'src/app/config/config';

@Component({
  selector: 'app-paquete-modal',
  templateUrl: './paquete-modal.component.html',
  styleUrls: ['./paquete-modal.component.css']
})
export class PaqueteModalComponent implements OnInit {

  @Input() log: any;
  public paquete;
  url_backend = URL_SERVICIOS.url_backend;

  constructor(
    public dialogRef: MatDialogRef<PaqueteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data 
  ) {
    this.paquete = data.paquete;
   }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();

  }

}

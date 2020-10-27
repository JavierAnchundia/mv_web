import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() log: any;
  public historial : []=[];
  public numRosas;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data 
  ) {
    this.historial = data.historial;
    this.numRosas = data.num;
   }

  ngOnInit(): void {
  }
  
  closeModal() {
    this.dialogRef.close();

  }
}

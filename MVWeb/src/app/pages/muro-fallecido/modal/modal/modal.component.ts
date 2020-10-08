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
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data 
  ) {
    this.historial = data.historial;
    console.log(data);

   }

  ngOnInit(): void {
    console.log(this.historial);
  }
  
  closeModal() {
    this.dialogRef.close();
  }
}

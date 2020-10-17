import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


export interface DialogData {
  template: string;
}

@Component({
  selector: 'app-promotion-template-confirmation',
  templateUrl: './promotion-template-confirmation.component.html',
  styleUrls: ['./promotion-template-confirmation.component.scss']
})
export class PromotionTemplateConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<PromotionTemplateConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

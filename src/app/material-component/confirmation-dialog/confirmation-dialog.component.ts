// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-confirmation-dialog',
//   templateUrl: './confirmation-dialog.component.html',
//   styleUrls: ['./confirmation-dialog.component.css']
// })
// export class ConfirmationDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  message = 'Are you sure?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
      if (data) {
        this.message = data.message || this.message;
        if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}

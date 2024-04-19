import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout-dialog',
  templateUrl: './confirm-logout-dialog.component.html',
  styleUrl: './confirm-logout-dialog.component.css'
})
export class ConfirmLogoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmLogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm(): void {
    // Pass true to indicate confirmation
    this.dialogRef.close(true); 
  }

  cancel(): void {
    // Pass false to indicate cancellation
    this.dialogRef.close(false); 
  }
}

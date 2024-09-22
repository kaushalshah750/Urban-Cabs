import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  get getIcon() {
    switch (this.data.status) {
      case 'success':
        return 'done';
      case 'error':
        return 'cancel_presentation';
      case 'warn':
        return 'warning';
      case 'info':
        return 'info';
    }
    return "";
  }

}

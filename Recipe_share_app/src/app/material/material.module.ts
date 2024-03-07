import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      MatIconModule,
      MatToolbarModule,
      MatCardModule, 
      ReactiveFormsModule, 
      MatFormFieldModule,
      MatProgressSpinnerModule, 
      MatInputModule,
      MatSelectModule,
      MatOptionModule,
      MatSnackBarModule,
      MatTooltipModule
  ],
  exports: [ 
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,    
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder,Validators, FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';



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
   MatInputModule
  ],
  exports: [ 
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule
  ]
})
export class MaterialModule { }

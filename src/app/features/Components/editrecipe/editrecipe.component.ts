import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrl: './editrecipe.component.css'
})
export class EditrecipeComponent implements OnInit {

  editrecipe!: FormGroup;

    //category optons 
Categorys = [
  {value: 'BreakFast', viewValue: 'BreakFast'},
  {value: 'Lunch', viewValue: 'Lunch'},
  {value: 'Dinner', viewValue: 'Dinner'},
  {value: 'Snack', viewValue: 'Snack'}
  ];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditrecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ){
    this.editrecipe = this.formBuilder.group({
      title: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      instructions: ['', [Validators.required]],
      recipePicture: ['', [Validators.required], Validators.pattern('https?://.+')],
      category: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });

    //get the recipe id 
    console.log(data.recipeId);
  }

  ngOnInit(): void {
    
  }
  edit() {
    throw new Error('Method not implemented.');
    }

    close() {
      this.dialogRef.close();
    }
}

import { Component } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  constructor(
    private dialog: MatDialog,

  ) { 

  }
  newrecipe(){
     const dialogRef = this.dialog.open(NewRecipeComponent, {
      width: '500px',
    // Prevent closing by clicking outside or pressing ESC
    disableClose: true
    });
  }

}

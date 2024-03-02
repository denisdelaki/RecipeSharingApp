import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../core/recipes.service';

@Component({
  selector: 'app-view-recipe-component',
  templateUrl: './view-recipe-component.component.html',
  styleUrl: './view-recipe-component.component.scss'
})
export class ViewRecipeComponentComponent implements OnInit{
  recipeId: any;
  recipe: any;
  showOptions = false;
constructor(private route: ActivatedRoute,
  private recipeservice : RecipesService,
 private router: Router){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      // Fetch recipe data using this.recipeId and populate form fields
      this.fetchRecipeData(this.recipeId);
    });
  }
  toggleShareOptions() {
    this.showOptions = !this.showOptions;
  }

  shareWithEmail() {
    // Prompt the user to open email
    window.location.href = 'mailto:?subject=Your Subject&body=Your Body';
  }

  shareWithWhatsApp() {
    // Prompt the user to open WhatsApp
    window.location.href = 'https://wa.me/?text=Your Message';
  }
  fetchRecipeData(recipeId: any) {
    //fetch recipe data from service based on recipeId
     this.recipeservice.getData(recipeId).subscribe(recipe => {
      console.log(recipe)
      this.recipe = recipe;
    })
  }
  cancel(){
    this.router.navigate(['/allrecipes'])
  }
}

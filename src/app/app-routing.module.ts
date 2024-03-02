import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module')
        .then(m => m.AuthenticationModule)
  },
  { path: 'pages', loadChildren: () => import('./pages/pages.module')  
  .then(m => m.PagesModule)
  },
  { path: '', loadChildren: () => import('./recipe/recipe.module')  
  .then(m => m.RecipeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module')
        .then(m => m.AuthModule)
  },
  { path: 'features', loadChildren: () => import('./features/features.module')
  .then(m => m.FeaturesModule)
  },
  { path: '', loadChildren: () => import('./pages/pages.module')
  .then(m => m.PagesModule)
  },
  {path: '**', loadChildren: ()=> import('./pages/pages.module')
    .then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
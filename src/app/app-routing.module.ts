import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'red-social',
    loadChildren: () => import('./red-social/red-social.module').then(m => m.RedSocialModule)
  },
  {
    path: '', redirectTo: 'red-social', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

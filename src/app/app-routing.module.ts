import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/route-guard';

const routes: Routes = [
  {
    path: 'accessForm',
    loadChildren: () => import('./components/access-token-form/access-token-form.module').then(m => m.AccessTokenFormModule),
  },
  {
    path: 'repositories',
    loadChildren: () => import('./components/repositories/repositories.module').then(m => m.RepositoriesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'repository/:owner/:repositoryName',
    loadChildren: () => import('./components/repository/repository.module').then(m => m.RepositoryModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/accessForm',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/accessForm',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

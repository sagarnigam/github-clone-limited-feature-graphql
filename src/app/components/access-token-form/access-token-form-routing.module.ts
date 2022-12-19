import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessTokenFormComponent } from './access-token-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccessTokenFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessTokenFormRoutingModule { }

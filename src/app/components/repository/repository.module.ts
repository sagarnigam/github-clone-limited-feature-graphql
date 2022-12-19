import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryComponent } from './repository.component';
import { RepositoryRoutingModule } from './repository-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    RepositoryComponent
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ]
})
export class RepositoryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesComponent } from './repositories.component';
import { RepositoriesRoutingModule } from './repositories-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    RepositoriesComponent
  ],
  imports: [
    CommonModule,
    RepositoriesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ]
})
export class RepositoriesModule { }

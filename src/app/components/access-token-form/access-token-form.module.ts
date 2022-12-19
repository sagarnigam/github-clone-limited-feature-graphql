import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessTokenFormRoutingModule } from './access-token-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AccessTokenFormComponent } from './access-token-form.component';

@NgModule({
  declarations: [AccessTokenFormComponent],
  imports: [
    AccessTokenFormRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  exports: [AccessTokenFormComponent],
})
export class AccessTokenFormModule {}

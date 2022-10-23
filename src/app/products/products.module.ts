import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerComponent } from './pages/ver/ver.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    VerComponent,
    AgregarComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ProductsModule { }

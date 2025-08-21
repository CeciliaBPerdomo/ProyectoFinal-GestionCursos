// src/app/pages/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Routing 
import { AdminRoutingModule } from './admin-routing.module';

// Componentes
import { AdminComponent } from './registro/admin';
import { ListadoAlumnos } from './listado-alumnos/listado-alumnos';
import { ListadoProfesores } from './listado-profesores/listado-profesores';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,

    AdminRoutingModule,

    AdminComponent,          
    ListadoAlumnos,
    ListadoProfesores,
  ]
})

export class AdminModule {}

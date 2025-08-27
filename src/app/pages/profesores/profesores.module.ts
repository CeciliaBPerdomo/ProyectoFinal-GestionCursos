import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { ProfesoresRoutingModule } from './profesores-routing.module';
import { ProfesorDashboardComponent } from './dashboard/dashboard-profesores';
import { CursosProfesorComponent } from './cursos/cursos-profesor';
import { ListaAlumnosProfesorComponent } from "./alumnos/lista-alumnos-profesor"

@NgModule({
  imports: [
    CommonModule,

    ProfesoresRoutingModule,
    ProfesorDashboardComponent,
    CursosProfesorComponent,
    ListaAlumnosProfesorComponent,
  ]
})
export class ProfesoresModule { }
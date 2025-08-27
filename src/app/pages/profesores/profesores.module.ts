import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresRoutingModule } from './profesores-routing.module';
import { ProfesorDashboardComponent } from './dashboard/dashboard-profesores';
import { CursosProfesorComponent } from './cursos/cursos-profesor';

@NgModule({
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    ProfesorDashboardComponent,
    CursosProfesorComponent,
  ]
})
export class ProfesoresModule { }
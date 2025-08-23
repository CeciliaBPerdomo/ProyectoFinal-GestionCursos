import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresRoutingModule } from './profesores-routing.module';
import { ProfesorDashboardComponent } from './dashboard/dashboard-profesores';

@NgModule({
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    ProfesorDashboardComponent
  ]
})
export class ProfesoresModule { }
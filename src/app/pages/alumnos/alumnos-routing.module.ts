// src/app/pages/alumnos/alumnos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { MisCursos } from './mis-cursos/mis-cursos';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard-alumno', pathMatch: 'full' },
  { path: 'dashboard-alumno', loadComponent: () => import('./dashboard/dashboard-alumno').then(m => m.AlumnoDashboardComponent), },                             
  { path: 'mis-cursos', component: MisCursos }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AlumnosRoutingModule { }

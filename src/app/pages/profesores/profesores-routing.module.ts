import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard-profesores', pathMatch: 'full' },
  { path: 'dashboard-profesores',  loadComponent: () => import('./dashboard/dashboard-profesores').then(m => m.ProfesorDashboardComponent)},
  { path: 'cursos-profesor', loadComponent: () => import('./cursos/cursos-profesor').then(m => m.CursosProfesorComponent) },
  { path: 'lista-alumnos', loadComponent: () => import('./alumnos/lista-alumnos-profesor').then(m => m.ListaAlumnosProfesorComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesoresRoutingModule { }
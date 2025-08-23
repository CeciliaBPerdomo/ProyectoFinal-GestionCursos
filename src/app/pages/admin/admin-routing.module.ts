// src/app/pages/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/admin').then(m => m.AdminComponent)
  },
  {
    path: 'alumnos',
    loadComponent: () => import('./listado-alumnos/listado-alumnos').then(m => m.ListadoAlumnos)
  },
  {
    path: 'profesores',
    loadComponent: () => import('./listado-profesores/listado-profesores').then(m => m.ListadoProfesores)
  },
  {
    path: 'administradores',
    loadComponent: () => import('./listado-administradores/listado-administradores').then(m => m.ListadoAdministradores)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

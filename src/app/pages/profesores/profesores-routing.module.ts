import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard-profesores', 
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard-profesores', 
    loadComponent: () => import('./dashboard/dashboard-profesores').then(m => m.ProfesorDashboardComponent),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesoresRoutingModule { }
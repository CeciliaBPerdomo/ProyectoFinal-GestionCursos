// src/app/pages/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes Standalone
const routes: Routes = [
    { path: 'registro', loadComponent: () => import('./registro/admin').then(m => m.AdminComponent) },
    { path: 'alumnos', loadComponent: () => import('./listado-alumnos/listado-alumnos').then(m => m.ListadoAlumnos) },
    { path: 'profesores', loadComponent: () => import('./listado-profesores/listado-profesores').then(m => m.ListadoProfesores) },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }

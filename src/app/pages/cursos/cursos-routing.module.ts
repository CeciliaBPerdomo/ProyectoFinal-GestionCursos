// src/app/pages/cursos/cursos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./listado-cursos/listado-cursos').then(m => m.ListadoCursos) },    
  { path: 'listado-cursos', loadComponent: () => import('./listado-cursos/listado-cursos').then(m => m.ListadoCursos) },
  { path: 'alta', loadComponent: () => import('./alta-curso/alta-curso').then(m => m.AltaCurso) }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule {}

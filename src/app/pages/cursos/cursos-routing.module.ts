// src/app/pages/cursos/cursos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoCursos } from './listado-cursos/listado-cursos';
import { AltaCurso } from './alta-curso/alta-curso';

const routes: Routes = [
  { path: '', component: ListadoCursos, data: { modo: 'alumno' } },    
  { path: 'admin', component: ListadoCursos, data: { modo: 'admin' } },
  { path: 'alta', component: AltaCurso }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule {}

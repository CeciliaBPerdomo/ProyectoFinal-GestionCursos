// src/app/pages/alumnos/alumnos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListaAlumnos } from './lista-alumnos/lista-alumnos';
import { AltaAlumno } from './alta-alumno/alta-alumno';
import { MisCursos } from './mis-cursos/mis-cursos';

const routes: Routes = [
  { path: '', component: ListaAlumnos, data: { modo: 'alumno' } },          // Lista para alumnos
  { path: 'admin', component: ListaAlumnos, data: { modo: 'admin' } },      // Lista para admin
  { path: 'alta', component: AltaAlumno },                                  // Alta de alumno
  { path: 'mis-cursos', component: MisCursos, data: { modo: 'alumno' } }    // Mis cursos
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AlumnosRoutingModule {}

// app.routes.ts
import { Routes } from '@angular/router';
import { ListaAlumnos } from './pages/alumnos/lista-alumnos/lista-alumnos';
import { AltaAlumno } from './pages/alumnos/alta-alumno/alta-alumno';
import { ListadoCursos } from './pages/cursos/listado-cursos/listado-cursos';
import { AltaCurso } from './pages/cursos/alta-curso/alta-curso';
import { ListadoInscripciones } from './pages/inscripciones/listado-inscripciones/listado-inscripciones';

export const routes: Routes = [
  { path: 'alumnos', component: ListaAlumnos, data: { modo: 'alumno' } },
  { path: 'alumnos-admin', component: ListaAlumnos, data: { modo: 'admin' } },
  { path: 'alta-alumno', component: AltaAlumno },
  { path: 'cursos-admin', component: ListadoCursos, data: { modo: 'admin' } },
  { path: 'alta-curso', component: AltaCurso },
  { path: 'inscripciones-admin', component: ListadoInscripciones, data: { modo: 'admin' } },
];


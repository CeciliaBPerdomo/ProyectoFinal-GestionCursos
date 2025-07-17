// app.routes.ts
import { Routes } from '@angular/router';
import { ListaAlumnos } from './pages/alumnos/lista-alumnos/lista-alumnos';

export const routes: Routes = [
  { path: 'alumnos', component: ListaAlumnos, data: { modo: 'alumno' } },
  { path: 'alumnos-admin', component: ListaAlumnos, data: { modo: 'admin' } },
];

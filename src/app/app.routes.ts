// app.routes.ts
import { Routes } from '@angular/router';
import { InicioComponent } from './pages/home/inicio.component';

export const routes: Routes = [
  { path: '', component: InicioComponent }, 
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./pages/alumnos/alumnos.module').then(m => m.AlumnosModule)
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./pages/cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./pages/inscripciones/inscripciones.module').then(m => m.InscripcionesModule)
  },
  { path: '**', redirectTo: '/' }
];



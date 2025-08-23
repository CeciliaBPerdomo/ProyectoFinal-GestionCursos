// app.routes.ts
import { Routes } from '@angular/router';
import { InicioComponent } from './pages/home/inicio.component';
import { AuthGuard, AdminGuard} from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  {
    path: 'alumnos',
    canActivate: [AuthGuard],
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
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
   {
    path: 'profesores',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/profesores/profesores.module').then(m => m.ProfesoresModule) 
  },
  { path: '**', redirectTo: '/' }
];



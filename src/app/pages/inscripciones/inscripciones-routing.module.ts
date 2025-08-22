// src/app/pages/inscripciones/inscripciones-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoInscripciones } from './listado-inscripciones/listado-inscripciones';
import { AltaInscripcionComponent } from './alta-inscripcion/alta-inscripcion';

const routes: Routes = [
  { path: '', component: ListadoInscripciones, data: { modo: 'alumno' } },    
  { path: 'listado', component: ListadoInscripciones, data: { modo: 'admin' } }, 
  { path: 'alta', component: AltaInscripcionComponent }                        
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InscripcionesRoutingModule {}

// src/app/pages/inscripciones/inscripciones.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { AltaInscripcionComponent } from './alta-inscripcion/alta-inscripcion';
import { ListadoInscripciones } from './listado-inscripciones/listado-inscripciones';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InscripcionesRoutingModule,
        ListadoInscripciones,
        AltaInscripcionComponent
    ]
})

export class InscripcionesModule { }

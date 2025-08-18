// src/app/pages/cursos/cursos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CursosRoutingModule } from './cursos-routing.module';

// Componentes 
import { AltaCurso } from './alta-curso/alta-curso';
import { ListadoCursos } from './listado-cursos/listado-cursos';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CursosRoutingModule,
        ListadoCursos,
        AltaCurso
    ]
})

export class CursosModule { }

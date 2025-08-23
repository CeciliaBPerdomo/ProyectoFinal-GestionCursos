// src/app/pages/alumnos/alumnos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { AlumnosRoutingModule } from './alumnos-routing.module';

// Importar componentes 
import { AlumnoDashboardComponent } from './dashboard/dashboard-alumno';
// import { AltaAlumno } from './alta-alumno/alta-alumno';
// import { ListaAlumnos } from './lista-alumnos/lista-alumnos';
// import { MisCursos } from './mis-cursos/mis-cursos';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        AlumnosRoutingModule,

        AlumnoDashboardComponent,
        // ListaAlumnos,
        // MisCursos,
        // AltaAlumno
    ]
})

export class AlumnosModule { }

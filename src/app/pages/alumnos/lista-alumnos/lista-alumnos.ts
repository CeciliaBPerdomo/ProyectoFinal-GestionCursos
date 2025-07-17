// app/pages/alumnos/lista-alumnos/lista-alumnos.ts
import { Component, OnInit } from '@angular/core';

//Material UI 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Services y models 
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';

import { CursoService } from '../../../services/curso.service';
import { InscripcionService } from '../../../services/inscripcion.service';

@Component({
  selector: 'app-lista-alumnos',
    standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './lista-alumnos.html',
  styleUrls:  ['./lista-alumnos.css']
})

export class ListaAlumnos implements OnInit {
  alumnos: Alumno[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'cursoNombre', 'acciones'];

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
        private inscripcionService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.alumnos = this.alumnoService.getAlumnos();
  }

  getCursoNombre(id: number): string {
    const curso = this.cursoService.getCursoPorId(id);
    return curso ? curso.nombre : 'Desconocido';
  }

   getEstadoInscripcion(alumnoId: number, cursoId: number): string {
    // Buscamos la inscripción que corresponda al alumno y curso
    const inscripcion = this.inscripcionService.getInscripciones()
      .find(i => i.alumnoId === alumnoId && i.cursoId === cursoId);

    return inscripcion ? inscripcion.estado : 'Sin inscripción';
  }
}

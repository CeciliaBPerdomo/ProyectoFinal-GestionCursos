import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

// Models y servicios
import { Curso } from '../../../models/curso.model';
import { Alumno } from '../../../models/alumno.model';

import { CursoService } from '../../../services/curso.service';
import { AlumnoService } from '../../../services/alumno.service';
import { InscripcionService } from '../../../services/inscripcion.service';

import { EstadoInscripcion } from '../../../models/inscripcion.model';

interface CursoConEstado extends Curso {
  estado: EstadoInscripcion;
}

// Material UI
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './mis-cursos.html',
  styleUrls: ['./mis-cursos.css']
})

export class MisCursos implements OnInit {
  alumno: Alumno | undefined;
  cursosDelAlumno: CursoConEstado[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private inscripcionService: InscripcionService,
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    const idAlumno = 1;

    forkJoin({
      alumno: this.alumnoService.getAlumnoPorId(idAlumno),
      cursos: this.cursoService.getCursos()
    }).subscribe(({ alumno, cursos }) => {
      if (!alumno) return;
      this.alumno = alumno;

      // Inscripciones del alumno
      const inscripciones = alumno.inscripciones || [];

      // Cursos con estado según inscripciones
      const cursosConEstado: CursoConEstado[] = inscripciones.map(insc => {
        const curso = cursos.find(c => (c.cursoId || c.id) === insc.cursoId);
        return curso ? { ...curso, estado: insc.estado } : null;
      }).filter((curso): curso is CursoConEstado => curso !== null);

      // Agregar curso asignado directamente al alumno (sin inscripción)
      const cursoAsignado = cursos.find(c => (c.cursoId || c.id) === alumno.cursoId);
      if (cursoAsignado && !cursosConEstado.some(c => (c.cursoId || c.id) === (cursoAsignado.cursoId || cursoAsignado.id))) {
        cursosConEstado.push({ ...cursoAsignado, estado: 'sin inscripcion' });
      }

      this.cursosDelAlumno = cursosConEstado;
    });
  }
}
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

// Material UI
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface CursoConEstado extends Curso {
  estado: EstadoInscripcion;
}

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,

    // Material ui
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './mis-cursos.html',
  styleUrls: ['./mis-cursos.css']
})

export class MisCursos implements OnInit {
  alumno: Alumno | undefined;
  cursosDelAlumno: CursoConEstado[] = [];

  displayedColumns: string[] = ['curso', 'descripcion', 'estado'];

  constructor(
    private alumnoService: AlumnoService,
    private inscripcionService: InscripcionService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    const alumnoLogueado = JSON.parse(localStorage.getItem('user') || '{}');
    const idAlumno = Number(alumnoLogueado?.usuarioId);

    if (!idAlumno) return;

    forkJoin({
      alumno: this.alumnoService.getAlumnoPorId(idAlumno),
      cursos: this.cursoService.getCursos()
    }).subscribe(({ alumno, cursos }) => {
      if (!alumno) return;
      this.alumno = alumno;

      const inscripciones = alumno.inscripciones || [];

      const cursosConEstado: CursoConEstado[] = inscripciones.map(insc => {
        const curso = cursos.find(c => (c.cursoId || c.id) === insc.cursoId);
        return curso ? { ...curso, estado: insc.estado } : null;
      }).filter((curso): curso is CursoConEstado => curso !== null);

      const cursoAsignado = cursos.find(c => (c.cursoId || c.id) === alumno.cursoId);
      if (cursoAsignado && !cursosConEstado.some(c => (c.cursoId || c.id) === (cursoAsignado.cursoId || cursoAsignado.id))) {
        cursosConEstado.push({ ...cursoAsignado, estado: 'sin inscripcion' as EstadoInscripcion });
      }

      this.cursosDelAlumno = cursosConEstado;
    });
  }
}
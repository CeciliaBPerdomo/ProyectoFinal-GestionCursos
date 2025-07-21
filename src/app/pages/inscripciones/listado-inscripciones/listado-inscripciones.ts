import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

// Material UI
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// Models y services
import { InscripcionService } from '../../../services/inscripcion.service';
import { Inscripcion } from '../../../models/inscripcion.model';

import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';

import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';

@Component({
  selector: 'app-listado-inscripciones',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './listado-inscripciones.html',
  styleUrls: ['./listado-inscripciones.css']
})
export class ListadoInscripciones implements OnInit {

  @Input() modo: 'admin' | 'alumno' = 'admin';

  inscripciones: Inscripcion[] = [];
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  displayedColumns: string[] = ['id', 'alumno', 'curso', 'fecha', 'estado', 'acciones'];

  constructor(
    private inscripcionService: InscripcionService,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alumnos = this.alumnoService.getAlumnos();
    this.cursos = this.cursoService.getCursos();
    this.cargarInscripciones();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.alumnos = this.alumnoService.getAlumnos();
        this.cursos = this.cursoService.getCursos();
        this.cargarInscripciones();
        this.cdr.detectChanges();
      }
    });
  }

  cargarInscripciones(): void {
    this.alumnos = this.alumnoService.getAlumnos();
    this.cursos = this.cursoService.getCursos();
    const todasInscripciones = this.inscripcionService.getInscripciones();
    const alumnosConInscripciones = new Set(todasInscripciones.map(i => i.alumnoId));

    const sinInscripcion: Inscripcion[] = this.alumnos
      .filter(alumno => !alumnosConInscripciones.has(alumno.id))
      .map(alumno => ({
        id: -alumno.id,
        alumnoId: alumno.id,
        cursoId: alumno.cursoId ?? -1,
        fechaInscripcion: new Date(),
        estado: 'sin' as any
      }));

    this.inscripciones = [...todasInscripciones, ...sinInscripcion];

    const ordenPrioridad: Record<string, number> = {
      'sin': 0,
      'cancelada': 1,
      'activa': 2,
      'finalizada': 3
    };

    this.inscripciones.sort(
      (a, b) => (ordenPrioridad[a.estado] ?? 99) - (ordenPrioridad[b.estado] ?? 99)
    );
  }

  getAlumnoNombre(id: number): string {
    const idNum = Number(id);
    const alumno = this.alumnos.find(a => a.id === idNum);
    return alumno ? alumno.nombre : 'Desconocido';
  }

  getCursoNombre(id: number): string {
    const idNum = Number(id);
    if (idNum === -1) return 'Sin curso';
    const curso = this.cursos.find(c => c.id === idNum);
    return curso ? curso.nombre : 'Desconocido';
  }

  eliminarInscripcion(id: number): void {
    if (id < 0) return; // No se puede eliminar una inscripción "falsa"

    if (confirm('¿Seguro que querés eliminar esta inscripción?')) {
      this.inscripcionService.eliminarInscripcion(id);
      this.cargarInscripciones(); // Recalcular todo
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cargarInscripciones();
    });
  }
}

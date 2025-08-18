import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

// Material UI
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

// Models y services
import { InscripcionService } from '../../../services/inscripcion.service';
import { Inscripcion, EstadoInscripcion } from '../../../models/inscripcion.model';

import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';

import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';



declare var bootstrap: any;
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
    MatFormFieldModule,
    FormsModule,
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

  estados: EstadoInscripcion[] = ['activa', 'cancelada', 'finalizada', 'sin inscripcion', 'sin'];

  estadoEditandoId: number | null = null;
  estadoSeleccionado: EstadoInscripcion = 'activa';

  estadoSin: EstadoInscripcion = 'sin inscripcion';
  inscripcionIdAEliminar: number | null = null;
  modal: any;

  constructor(
    private inscripcionService: InscripcionService,
    private alumnoService: AlumnoService,
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    forkJoin({
      alumnos: this.alumnoService.getAlumnos(),
      cursos: this.cursoService.getCursos()
    }).subscribe(({ alumnos, cursos }) => {
      this.alumnos = alumnos;
      this.cursos = cursos;
      this.cargarInscripciones(); 
    });
  }


  cargarInscripciones(): void {
    const todasInscripciones = this.inscripcionService.getInscripciones(); // array normal

    // Detectar qué alumnos no tienen inscripciones
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

    // Combinar inscripciones existentes con los que no tienen
    this.inscripciones = [...todasInscripciones, ...sinInscripcion];

    // Ordenar por prioridad de estado
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
    const alumno = this.alumnos.find(a => a.id === id);
    return alumno ? alumno.nombre : 'Desconocido';
  }

  getCursoNombre(id: number): string {
    if (id === -1) return 'Sin curso';
    const curso = this.cursos.find(c => c.id === id);
    return curso ? curso.nombre : 'Desconocido';
  }

  editarEstado(inscripcionId: number, estadoActual: EstadoInscripcion): void {
    this.estadoEditandoId = inscripcionId;
    this.estadoSeleccionado = estadoActual;
  }

  public esEstadoSinInscripcion(estado: string): boolean {
    const estadoNormalizado = estado?.trim().toLowerCase();
    return estadoNormalizado === 'sin inscripcion' || estadoNormalizado === 'sin';
  }

  public mostrarEstadoNormalizado(estado: EstadoInscripcion | string): string {
    if (!estado) return '';
    const e = estado.trim().toLowerCase();
    if (e === 'sin' || e === 'sin inscripcion') return 'Sin inscripción';
    return estado.toUpperCase();
  }

  cancelarEdicion(): void {
    this.estadoEditandoId = null;
  }

  guardarEstado(inscripcionId: number): void {
    if (this.estadoEditandoId === null) return;

    const inscripcion = this.inscripciones.find(i => i.id === inscripcionId);
    if (!inscripcion) return;

    inscripcion.estado = this.estadoSeleccionado;

    // Si el estado cambia y es distinto de 'sin', y el id es negativo, asigno nuevo id positivo
    if (this.estadoSeleccionado !== 'sin inscripcion' && inscripcion.id < 0) {
      const maxId = this.inscripcionService.getInscripciones().reduce((max, i) => i.id > max ? i.id : max, 0);
      inscripcion.id = maxId + 1;
      this.inscripcionService.agregarInscripcion(inscripcion);
    } else {
      this.inscripcionService.actualizarInscripcion(inscripcion);
    }

    this.estadoEditandoId = null;
    this.cargarInscripciones();
  }

  mostrarModalEliminar(id: number): void {
    this.inscripcionIdAEliminar = id;
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
      this.modal.show();
    }
  }

  confirmarEliminacion(): void {
    if (this.inscripcionIdAEliminar !== null) {
      this.inscripcionService.eliminarInscripcion(this.inscripcionIdAEliminar);
      this.cargarInscripciones();
      this.modal.hide();
    }
  }

  eliminarInscripcion(id: number): void {
    if (id < 0) return; // No se puede eliminar una inscripción "falsa"

    if (confirm('¿Seguro que querés eliminar esta inscripción?')) {
      this.inscripcionService.eliminarInscripcion(id);
      this.cargarInscripciones();
    }
  }
}

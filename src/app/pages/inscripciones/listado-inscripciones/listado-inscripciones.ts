import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Usuarios } from '../../../models/usuario.model';

// Material UI
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// NgRx
import { AppState } from '../../../store/models/app-state';
import {
  loadInscripciones,
  updateInscripcion,
  deleteInscripcion,
  addInscripcion,
  setFilterByEstado
} from '../../../store/actions/inscripcion.actions';
import {
  selectAllInscripciones,
  selectInscripcionLoading,
  selectInscripcionError
} from '../../../store/selectors/inscripcion.selectors';
import { selectAllAlumnos } from '../../../store/selectors/usuario.selectors';
import { loadUsuarios } from '../../../store/actions/usuario.actions';
import { loadCursos } from '../../../store/actions/curso.actions';
import { selectAllCursos } from '../../../store/selectors/curso.selectors';

// Models
import { Inscripcion, EstadoInscripcion } from '../../../models/inscripcion.model';
import { Curso } from '../../../models/curso.model';

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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './listado-inscripciones.html',
  styleUrls: ['./listado-inscripciones.css']
})


export class ListadoInscripciones implements OnInit {

  @Input() modo: 'admin' | 'alumno' = 'admin';

  inscripciones$: Observable<Inscripcion[]>;
  inscripcionesCompletas$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  alumnos$: Observable<Usuarios[]>;
  cursos$: Observable<Curso[]>;

  displayedColumns: string[] = ['id', 'alumno', 'curso', 'fecha', 'estado', 'acciones'];

  estados: EstadoInscripcion[] = ['activa', 'cancelada', 'finalizada', 'sin inscripcion', 'sin'];

  estadoEditandoId: number | null = null;
  estadoSeleccionado: EstadoInscripcion = 'activa';
  inscripcionIdAEliminar: number | null = null;
  modal: any;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.inscripciones$ = this.store.select(selectAllInscripciones);
    this.loading$ = this.store.select(selectInscripcionLoading);
    this.error$ = this.store.select(selectInscripcionError);
    this.alumnos$ = this.store.select(selectAllAlumnos);
    this.cursos$ = this.store.select(selectAllCursos);

    // Combina inscripciones con nombres de alumnos y cursos
    this.inscripcionesCompletas$ = combineLatest([
      this.inscripciones$,
      this.alumnos$,
      this.cursos$
    ]).pipe(
      map(([inscripciones, alumnos, cursos]) =>
        inscripciones.map(inscripcion => ({
          ...inscripcion,
          alumnoNombre: this.findAlumnoNombre(alumnos, inscripcion.alumnoId),
          cursoNombre: this.findCursoNombre(cursos, inscripcion.cursoId)
        }))
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsuarios());
    this.store.dispatch(loadCursos());
    this.store.dispatch(loadInscripciones());

    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(`Error: ${error}`, 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-error'
        });
      }
    });
  }

  private findAlumnoNombre(alumnos: Usuarios[], alumnoId: number): string {
    const alumno = alumnos.find(a =>
      Number(a.id) === Number(alumnoId) ||
      Number((a as any).usuarioId) === Number(alumnoId)
    );
    return alumno ? alumno.nombre : `Desconocido (ID: ${alumnoId})`;
  }

  private findCursoNombre(cursos: Curso[], cursoId: number): string {
    const curso = cursos.find(c =>
      Number(c.id) === Number(cursoId) ||
      Number((c as any).cursoId) === Number(cursoId) ||
      Number((c as any).CursoId) === Number(cursoId)
    );
    return curso ? curso.nombre : `Desconocido (ID: ${cursoId})`;
  }

  editarEstado(inscripcionId: number, estadoActual: EstadoInscripcion): void {
    this.estadoEditandoId = inscripcionId;
    this.estadoSeleccionado = estadoActual;
  }

  public esEstadoSinInscripcion(estado: string): boolean {
    if (!estado) return false;
    const estadoNormalizado = estado.trim().toLowerCase();
    return estadoNormalizado === 'sin inscripcion' || estadoNormalizado === 'sin';
  }

  public mostrarEstadoNormalizado(estado: EstadoInscripcion | string): string {
    if (!estado) return '';
    const e = estado.trim().toLowerCase();
    if (e === 'sin' || e === 'sin inscripcion') return 'Sin inscripción';
    return estado.charAt(0).toUpperCase() + estado.slice(1);
  }

  cancelarEdicion(): void {
    this.estadoEditandoId = null;
  }

  guardarEstado(inscripcionId: number, inscripcion: Inscripcion): void {
    if (this.estadoEditandoId === null) return;

    const inscripcionActualizada: Inscripcion = {
      ...inscripcion,
      estado: this.estadoSeleccionado
    };

    if (this.estadoSeleccionado !== 'sin inscripcion' && this.estadoSeleccionado !== 'sin' && inscripcionId < 0) {
      // Crear nueva inscripción
      const nuevaInscripcion: Inscripcion = {
        ...inscripcionActualizada,
        inscrId: Math.abs(inscripcionId),
        fechaInsc: new Date().toISOString().split('T')[0]
      };
      this.store.dispatch(addInscripcion({ inscripcion: nuevaInscripcion }));
    } else {
      // Actualizar inscripción existente
      this.store.dispatch(updateInscripcion({ inscripcion: inscripcionActualizada }));
    }

    this.estadoEditandoId = null;

    this.snackBar.open('Estado actualizado correctamente', 'Cerrar', {
      duration: 2000,
      panelClass: 'snackbar-success'
    });
  }

  mostrarModalEliminar(id: number): void {
    this.inscripcionIdAEliminar = id;
    this.inicializarModal();
  }

  private inicializarModal(): void {
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);

      const confirmBtn = document.getElementById('confirmDeleteBtn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          this.confirmarEliminacion();
        });
      }

      this.modal.show();
    }
  }

  confirmarEliminacion(): void {
    if (this.inscripcionIdAEliminar !== null) {
      this.eliminarInscripcion(this.inscripcionIdAEliminar);
      this.modal?.hide();
      this.inscripcionIdAEliminar = null;
    }
  }

  eliminarInscripcion(id: number): void {
    if (id < 0) return;
    this.store.dispatch(deleteInscripcion({ id }));

    this.snackBar.open('Inscripción eliminada correctamente', 'Cerrar', {
      duration: 2000,
      panelClass: 'snackbar-success'
    });
  }

  filtrarPorEstado(estado: string): void {
    this.store.dispatch(setFilterByEstado({ estado }));
  }

  refrescar(): void {
    this.store.dispatch(loadInscripciones());
    this.snackBar.open('Lista de inscripciones actualizada', 'Cerrar', {
      duration: 1500,
      panelClass: 'snackbar-info'
    });
  }

  volverAlDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
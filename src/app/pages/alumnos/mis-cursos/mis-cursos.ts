import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// Material UI
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

// Models y servicios
import { Curso } from '../../../models/curso.model';
import { Alumno } from '../../../models/alumno.model';
import { EstadoInscripcion } from '../../../models/inscripcion.model';
import { AlumnoService } from '../../../services/alumno.service';
import { CursoService } from '../../../services/curso.service';
import { InscripcionService } from '../../../services/inscripcion.service';
import { AppState } from '../../../store/models/app-state';

interface CursoConEstado extends Curso {
  estado: EstadoInscripcion | 'sin inscripcion';
}

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './mis-cursos.html',
  styleUrls: ['./mis-cursos.css']
})
export class MisCursos implements OnInit {
  cursos$ = new BehaviorSubject<CursoConEstado[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  displayedColumns: string[] = ['nombre', 'descripcion', 'estado'];

  constructor(
    private store: Store<AppState>,
    private alumnoService: AlumnoService,
    private inscripcionService: InscripcionService,
    private cursoService: CursoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.loading$.next(true);
    this.error$.next(null);

    const alumnoLogueado = JSON.parse(localStorage.getItem('user') || '{}');
    const idAlumno = Number(alumnoLogueado?.usuarioId);

    if (!idAlumno) {
      this.error$.next('No se encontró el alumno logueado');
      this.loading$.next(false);
      return;
    }

    forkJoin({
      alumno: this.alumnoService.getAlumnoPorId(idAlumno),
      cursos: this.cursoService.getCursos()
    })
      .pipe(
        catchError(err => {
          this.error$.next('Error cargando cursos del alumno');
          return of({ alumno: null, cursos: [] });
        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(({ alumno, cursos }) => {
        if (!alumno) return;

        // Mapeamos todas las inscripciones
        const cursosConEstado: CursoConEstado[] = alumno.inscripciones?.map(insc => {
          const curso = cursos.find(c => c.cursoId === insc.cursoId || c.id === insc.cursoId);
          if (curso) {
            return { ...curso, estado: insc.estado };
          }
          return null;
        }).filter((curso): curso is CursoConEstado => curso !== null) || [];

        // Si hay un curso asignado directamente y no está en inscripciones, lo agregamos
        if (alumno.cursoId) {
          const asignado = cursos.find(c => c.cursoId === alumno.cursoId || c.id === alumno.cursoId);
          if (asignado && !cursosConEstado.some(c => c.cursoId === asignado.cursoId || c.id === asignado.id)) {
            cursosConEstado.push({ ...asignado, estado: 'sin inscripcion' });
          }
        }

        this.cursos$.next(cursosConEstado);
      });
  }

  refrescar(): void {
    this.cargarCursos();
    this.snackBar.open('Listado de cursos actualizado', 'Cerrar', {
      duration: 2000,
      panelClass: 'snackbar-info'
    });
  }
}

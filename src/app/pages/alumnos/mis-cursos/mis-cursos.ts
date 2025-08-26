import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

// Models y servicios
import { Curso } from '../../../models/curso.model';
import { EstadoInscripcion } from '../../../models/inscripcion.model';
import { Usuarios } from '../../../models/usuario.model';
import { CursoService } from '../../../services/curso.service';
import { InscripcionService } from '../../../services/inscripcion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AppState } from '../../../store/models/app-state';

interface CursoConEstado extends Curso {
  estado: EstadoInscripcion | 'sin inscripcion';
  profesorNombre: string;
  alumnosInscritos: number;
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

  cursos$!: Observable<CursoConEstado[]>;
  loading = true;
  error: string | null = null;
  displayedColumns: string[] = ['nombre', 'descripcion', 'profesor', 'alumnosInscritos','estado'];

  constructor(
    private store: Store<AppState>,
    private cursoService: CursoService,
    private inscripcionService: InscripcionService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  private getCursoId(c: any): string {
    return String(c?.cursoId ?? c?.CursoId ?? c?.id ?? '');
  }

  cargarCursos(): void {
    this.loading = true;

    const userLS = JSON.parse(localStorage.getItem('user') || '{}');
    const idUsuario = Number(userLS?.usuarioId);

    if (!idUsuario) {
      this.snackBar.open('No se encontró el usuario logueado', 'Cerrar', { duration: 2500 });
      this.loading = false;
      return;
    }

    // Obtener todos los profesores desde el servicio
    const profesores$ = this.usuarioService.getProfesores().pipe(
      catchError(error => {
        console.error('Error al cargar profesores:', error);
        return of([] as Usuarios[]);
      })
    );

    // Obtener todas las inscripciones para contar alumnos por curso
    const todasLasInscripciones$ = this.inscripcionService.getInscripciones().pipe(
      catchError(error => {
        console.error('Error al cargar todas las inscripciones:', error);
        return of([]);
      })
    );

    this.cursos$ = forkJoin({
      cursos: this.cursoService.getCursos().pipe(catchError(() => of([]))),
      inscripciones: this.inscripcionService.getInscripcionesPorAlumno(idUsuario).pipe(catchError(() => of([]))),
      profesores: profesores$,
      todasInscripciones: todasLasInscripciones$
    }).pipe(
      map(({ cursos, inscripciones, profesores, todasInscripciones }) => {

        // Contar alumnos inscritos por curso
        const alumnosPorCurso: { [cursoId: string]: number } = {};
        todasInscripciones.forEach(insc => {
          const cursoId = String(insc.cursoId);
          alumnosPorCurso[cursoId] = (alumnosPorCurso[cursoId] || 0) + 1;
        });

        const cursosConEstado: CursoConEstado[] = inscripciones
          .map(insc => {
            const curso = cursos.find(c => this.getCursoId(c) === String(insc.cursoId));
            if (!curso) return null;

            // Convertir ambos IDs a string para comparación consistente
            const cursoProfesorId = String(curso.profesorId);
            const profesor = profesores.find(p => String(p.usuarioId) === cursoProfesorId);

             // Obtener cantidad de alumnos inscritos
            const cursoId = this.getCursoId(curso);
            const alumnosInscritos = alumnosPorCurso[cursoId] || 0;

            return {
              ...curso,
              estado: insc.estado ?? 'sin inscripcion',
              profesorNombre: profesor ? profesor.nombre : 'Sin asignar',
              alumnosInscritos: alumnosInscritos
            } as CursoConEstado;
          })
          .filter((c): c is CursoConEstado => c !== null);

        this.loading = false;

        if (!cursosConEstado.length) {
          this.snackBar.open('Este usuario no tiene inscripciones asociadas', 'Cerrar', { duration: 2500 });
        }
        return cursosConEstado;
      }),
      catchError(error => {
        console.error('Error al cargar cursos:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar los cursos', 'Cerrar', { duration: 2500 });
        return of([]);
      })
    );
  }

  refrescar(): void {
    this.cargarCursos();
    this.snackBar.open('Listado de cursos actualizado', 'Cerrar', { duration: 2000 });
  }
}
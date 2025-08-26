import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular y Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

// NgRx
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { AppState } from '../../../store/models/app-state';
import {
  loadCursos,
  deleteCurso,
  updateCurso
} from '../../../store/actions/curso.actions';
import {
  selectAllCursos,
  selectCursoLoading,
  selectCursoError
} from '../../../store/selectors/curso.selectors';
import { selectAllUsuarios } from '../../../store/selectors/usuario.selectors';
import { loadUsuarios } from '../../../store/actions/usuario.actions';

// Models
import { Curso } from '../../../models/curso.model';
import { Usuarios } from '../../../models/usuario.model';

declare var bootstrap: any;

interface CursoConProfesor extends Curso {
  profesorNombre: string;
}

@Component({
  selector: 'app-listado-cursos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './listado-cursos.html',
  styleUrls: ['./listado-cursos.css']
})

export class ListadoCursos implements OnInit {
  cursos$: Observable<CursoConProfesor[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  usuarios$: Observable<Usuarios[]>;

  displayedColumns: string[] = ['nombre', 'descripcion', 'cantHoras', 'cantClases', 'profesor', 'acciones'];

  // Modal para borrar
  cursoIdAEliminar: number | null = null;
  modal: any;

  cursoEditandoId: number | null = null;
  cursoEditado: Partial<Curso> = {};

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.cursos$ = combineLatest([
      this.store.select(selectAllCursos),
      this.store.select(selectAllUsuarios)
    ]).pipe(
      map(([cursos, usuarios]) => {
        return cursos.map(curso => {
          const profesor = usuarios.find(u =>
            u.usuarioId === curso.profesorId || u.id === curso.profesorId
          );
          return {
            ...curso,
            profesorNombre: profesor ? profesor.nombre : 'Sin asignar'
          } as CursoConProfesor;
        });
      })
    );

    this.loading$ = this.store.select(selectCursoLoading);
    this.error$ = this.store.select(selectCursoError);
    this.usuarios$ = this.store.select(selectAllUsuarios);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCursos());
    this.store.dispatch(loadUsuarios()); // Cargar usuarios para obtener nombres de profesores

    // Debug: log the courses to see their structure
    this.cursos$.subscribe(cursos => {
     // console.log('Courses loaded:', cursos);
      cursos.forEach(curso => {
        console.log('Course ID:', curso.cursoId, 'Course:', curso);
      });
    });

    // Manejar errores
    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(`Error: ${error}`, 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-error'
        });
      }
    });
  }

  editarCurso(curso: Curso): void {
     this.cursoEditandoId = curso.id!;
    this.cursoEditado = { ...curso };
  }

  guardarCursoEditado(): void {
    if (this.cursoEditandoId !== null && this.cursoEditado) {
    const cursoActualizado: Curso = {
      ...this.cursoEditado,
      id: this.cursoEditandoId 
    } as Curso;
    
    this.store.dispatch(updateCurso({ curso: cursoActualizado }));

      this.snackBar.open('Curso actualizado correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackbar-exito'
      });

      this.cancelarEdicion();
    }
  }

  cancelarEdicion(): void {
    this.cursoEditandoId = null;
    this.cursoEditado = {};
  }

  ngAfterViewInit(): void {
    this.inicializarModal();
  }

  private inicializarModal(): void {
    const modalElement = document.getElementById('confirmDeleteCursoModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);

      const confirmBtn = document.getElementById('confirmDeleteCursoBtn');
      if (confirmBtn) {
        // Remove any existing event listeners
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode?.replaceChild(newConfirmBtn, confirmBtn);

        // Add new event listener that uses a closure
        newConfirmBtn.addEventListener('click', () => {
          // Use the current value of cursoIdAEliminar
          const currentId = this.cursoIdAEliminar;
          console.log('Current ID:', currentId);

          if (currentId !== null && currentId !== undefined) {
            this.eliminarCursoConfirmado(currentId);
          } else {
            console.error('cursoIdAEliminar is null or undefined');
            this.snackBar.open('Error: No se pudo obtener el ID del curso', 'Cerrar', {
              duration: 3000,
              panelClass: 'snackbar-error'
            });
            this.modal?.hide();
          }
        });
      }
    }
  }


  mostrarModalEliminar(id: number): void {
    this.cursoIdAEliminar = id;
    console.log('Setting cursoIdAEliminar to:', id);
    this.modal?.show();
  }

  eliminarCursoConfirmado(id: number): void {
    console.log('Deleting course with ID:', id);

    if (!id || id === undefined) {
      this.snackBar.open('Error: No se pudo obtener el ID del curso', 'Cerrar', {
        duration: 3000,
        panelClass: 'snackbar-error'
      });
      this.modal?.hide();
      this.cursoIdAEliminar = null;
      return;
    }

    this.store.dispatch(deleteCurso({ id }));

    this.snackBar.open('Curso eliminado 🗑️ correctamente', 'Cerrar', {
      duration: 3000,
      panelClass: 'snackbar-exito',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    this.modal?.hide();
    this.cursoIdAEliminar = null;
  }

  refrescar(): void {
    this.store.dispatch(loadCursos());
    this.store.dispatch(loadUsuarios());
    this.snackBar.open('Lista de cursos actualizada', 'Cerrar', {
      duration: 2000,
      panelClass: 'snackbar-info'
    });
  }
}
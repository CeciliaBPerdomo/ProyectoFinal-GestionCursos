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
import { Observable } from 'rxjs';
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

// Models
import { Curso } from '../../../models/curso.model';

declare var bootstrap: any;

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
  cursos$: Observable<Curso[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  displayedColumns: string[] = ['nombre', 'descripcion', 'cantHoras', 'cantClases', 'profesorId', 'acciones'];

  // Modal para borrar
  cursoIdAEliminar: number | null = null;
  modal: any;

  cursoEditandoId: number | null = null;
  cursoEditado: Partial<Curso> = {};

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.cursos$ = this.store.select(selectAllCursos);
    this.loading$ = this.store.select(selectCursoLoading);
    this.error$ = this.store.select(selectCursoError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCursos());
    
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
    this.cursoEditandoId = curso.cursoId!;
    this.cursoEditado = { ...curso };
  }

  guardarCursoEditado(): void {
    if (this.cursoEditandoId !== null && this.cursoEditado) {
      const cursoActualizado: Curso = {
        ...this.cursoEditado,
        cursoId: this.cursoEditandoId
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
        confirmBtn.addEventListener('click', () => {
          if (this.cursoIdAEliminar !== null) {
            this.eliminarCursoConfirmado(this.cursoIdAEliminar);
          }
        });
      }
    }
  }

  mostrarModalEliminar(id: number): void {
    this.cursoIdAEliminar = id;
    this.modal?.show();
  }

  eliminarCursoConfirmado(id: number): void {
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
    this.snackBar.open('Lista de cursos actualizada', 'Cerrar', {
      duration: 2000,
      panelClass: 'snackbar-info'
    });
  }
}
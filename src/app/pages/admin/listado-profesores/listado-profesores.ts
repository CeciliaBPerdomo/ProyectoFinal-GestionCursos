import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Usuarios } from '../../../models/usuario.model';
import { AppState } from '../../../store/models/app-state';
import {
  loadUsuariosByRol,
  deleteUsuario,
  setFilterByRol
} from '../../../store/actions/usuario.actions';
import {
  selectUsuariosFiltrados,
  selectUsuarioLoading,
  selectUsuarioError
} from '../../../store/selectors/usuario.selectors';

declare var bootstrap: any;

@Component({
  selector: 'app-listado-profesores',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './listado-profesores.html',
  styleUrls: ['./listado-profesores.css']
})
export class ListadoProfesores implements OnInit {
  profesores$: Observable<Usuarios[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // Quitamos 'rol' ya que todos son profesores
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'perfil', 'acciones'];

  // Modal para borrar
  profesorIdAEliminar: number | null = null;
  modal: any;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.profesores$ = this.store.select(selectUsuariosFiltrados);
    this.loading$ = this.store.select(selectUsuarioLoading);
    this.error$ = this.store.select(selectUsuarioError);
  }

  ngOnInit(): void {
    this.store.dispatch(setFilterByRol({ rol: 'profesor' }));
    this.store.dispatch(loadUsuariosByRol({ rol: 'profesor' }));

    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(`Error: ${error}`, 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-error'
        });
      }
    });
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
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode?.replaceChild(newConfirmBtn, confirmBtn);

        newConfirmBtn.addEventListener('click', () => {
          const currentId = this.profesorIdAEliminar;

          if (currentId !== null && currentId !== undefined) {
            this.eliminarProfesorConfirmado(currentId);
          } else {
            console.error('profesorIdAEliminiar is null or undefined');
            this.snackBar.open('Error: No se pudo obtener el ID del alumno', 'Cerrar', {
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
    this.profesorIdAEliminar = id;
    this.modal?.show();
  }

  eliminarProfesorConfirmado(id: number): void {
    if (!id) return;

    this.store.dispatch(deleteUsuario({ id }));

    setTimeout(() => {
      this.store.dispatch(loadUsuariosByRol({ rol: 'profesor' }));
    }, 100);

    this.snackBar.open('Profesor eliminado correctamente', 'Cerrar', {
      duration: 3000,
      panelClass: 'snackbar-success',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    this.modal?.hide();
    this.profesorIdAEliminar = null;
  }

  refrescar(): void {
    this.store.dispatch(loadUsuariosByRol({ rol: 'profesor' }));
  }
}
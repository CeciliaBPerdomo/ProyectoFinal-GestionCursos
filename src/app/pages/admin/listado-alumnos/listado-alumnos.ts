import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material UI
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
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
import * as UsuarioActions from '../../../store/actions/usuario.actions';
import { map } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-listado-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './listado-alumnos.html',
  styleUrls: ['./listado-alumnos.css']
})

export class ListadoAlumnos implements OnInit {
  alumnos$: Observable<Usuarios[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'perfil', 'acciones'];

  // Modal para borrar
  alumnoIdAEliminar: number | null = null;
  modal: any;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.alumnos$ = this.store.select(selectUsuariosFiltrados);
    this.loading$ = this.store.select(selectUsuarioLoading);
    this.error$ = this.store.select(selectUsuarioError);
  }

  ngOnInit(): void {
    this.store.dispatch(setFilterByRol({ rol: 'alumno' }));
    this.store.dispatch(loadUsuariosByRol({ rol: 'alumno' }));

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
          const currentId = this.alumnoIdAEliminar;

          if (currentId !== null && currentId !== undefined) {
            this.eliminarAlumnoConfirmado(currentId);
          } else {
            console.error('alumnoIdAEliminar is null or undefined');
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
    this.alumnoIdAEliminar = id;
    this.modal?.show();
  }

  eliminarAlumnoConfirmado(id: number): void {
    if (!id) return;

    this.store.dispatch(deleteUsuario({ id }));

    setTimeout(() => {
      this.store.dispatch(loadUsuariosByRol({ rol: 'alumno' }));
    }, 100);

    this.snackBar.open('Alumno eliminado correctamente', 'Cerrar', {
      duration: 3000,
      panelClass: 'snackbar-success',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    this.modal?.hide();
    this.alumnoIdAEliminar = null;
  }


  refrescar(): void {
    this.store.dispatch(loadUsuariosByRol({ rol: 'alumno' }));
    this.snackBar.open('Lista de alumnos actualizada', 'Cerrar', {
      duration: 2000,
      panelClass: 'snackbar-info'
    });
  }
}
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
        this.snackBar.open(`Error: ${error}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este alumno?')) {
      this.store.dispatch(deleteUsuario({ id }));
      
      // Opcional: Mostrar mensaje de éxito
      this.snackBar.open('Alumno eliminado correctamente', 'Cerrar', { 
        duration: 2000 
      });
    }
  }

  refrescar(): void {
    this.store.dispatch(loadUsuariosByRol({ rol: 'alumno' }));
  }
}
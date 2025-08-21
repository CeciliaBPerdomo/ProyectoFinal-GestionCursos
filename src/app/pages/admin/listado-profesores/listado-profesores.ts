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
        this.snackBar.open(`Error: ${error}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  eliminarProfesor(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este profesor?')) {
      this.store.dispatch(deleteUsuario({ id }));
      this.snackBar.open('Profesor eliminado correctamente', 'Cerrar', { 
        duration: 2000 
      });
    }
  }

  refrescar(): void {
    this.store.dispatch(loadUsuariosByRol({ rol: 'profesor' }));
  }
}
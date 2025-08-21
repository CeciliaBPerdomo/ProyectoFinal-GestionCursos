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
  selector: 'app-listado-administradores',
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
  templateUrl: './listado-administradores.html',
  styleUrls: ['./listado-administradores.css']
})
export class ListadoAdministradores implements OnInit {
  administradores$: Observable<Usuarios[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  // Columnas a mostrar (sin rol ya que todos son administradores)
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'perfil', 'acciones'];

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.administradores$ = this.store.select(selectUsuariosFiltrados);
    this.loading$ = this.store.select(selectUsuarioLoading);
    this.error$ = this.store.select(selectUsuarioError);
  }

  ngOnInit(): void {
    this.store.dispatch(setFilterByRol({ rol: 'administrador' }));
    this.store.dispatch(loadUsuariosByRol({ rol: 'administrador' }));
    
    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(`Error: ${error}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  eliminarAdministrador(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este administrador?')) {
      this.store.dispatch(deleteUsuario({ id }));
      this.snackBar.open('Administrador eliminado correctamente', 'Cerrar', { 
        duration: 2000 
      });
    }
  }

  refrescar(): void {
    this.store.dispatch(loadUsuariosByRol({ rol: 'administrador' }));
  }
}
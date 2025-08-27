import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../../../store/models/app-state';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import { selectAllCursos } from '../../../store/selectors/curso.selectors';
import * as CursoActions from '../../../store/actions/curso.actions';

@Component({
  selector: 'app-cursos-profesor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cursos-profesor.html',
  styleUrls: ['./cursos-profesor.css']
})
export class CursosProfesorComponent implements OnInit {

  user$: Observable<Usuarios | null>;
  cursos$!: Observable<any[]>; // Aquí van los cursos filtrados
  displayedColumns: string[] = ['id', 'nombre', 'estado', 'acciones'];

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (!user) return;

      const profesorId = Number(user.usuarioId);

      // Cargar cursos desde el backend
      this.store.dispatch(CursoActions.loadCursosByProfesor({ profesorId }));

      // Filtrar cursos del profesor
      this.cursos$ = this.store.select(selectAllCursos).pipe(
        map(cursos => cursos.filter(c => Number(c.profesorId) === profesorId))
      );
    });
  }

  editarCurso(cursoId: number) {
    console.log('Editar curso', cursoId);
    // Podés redirigir o abrir modal de edición
  }

  eliminarCurso(cursoId: number) {
    console.log('Eliminar curso', cursoId);
    // Dispatch de acción para eliminar curso
  }
}

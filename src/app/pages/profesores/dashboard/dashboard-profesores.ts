import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Material UI 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Redux
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { logout } from '../../../store/actions/auth.actions';
import { updateUsuario } from '../../../store/actions/usuario.actions';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import { AppState } from '../../../store/models/app-state';

// Estadísticas
import { selectCursosStatsPorProfesor } from '../../../store/selectors/curso.selectors';
import * as CursoActions from '../../../store/actions/curso.actions';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    // Material UI
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './dashboard-profesores.html',
  styleUrls: ['./dashboard-profesores.css']
})

export class ProfesorDashboardComponent implements OnInit {
  currentDate = new Date();
  user$: Observable<Usuarios | null>;
  totalCursos$!: Observable<number>;
  isMenuOpen = false;

  editMode = false;
  userData: Partial<Usuarios> = {};

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (!user) return;

      this.userData = { ...user };

      if (user.rol !== 'profesor') {
        this.router.navigate(['/']);
        return;
      }

      const profesorId = Number(user.usuarioId);
      this.store.dispatch(CursoActions.loadCursosByProfesor({ profesorId }));
      this.totalCursos$ = this.store.select(selectCursosStatsPorProfesor(profesorId)).pipe(
        map(stats => stats.total)
      );
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  navigateTo(path: string): void {
    this.isMenuOpen = false;
    this.router.navigate([path]);
  }

  enableEdit(): void {
    this.editMode = true;
  }

  saveChanges(): void {
    if (!this.userData.usuarioId) return;
    this.editMode = false;
    this.store.dispatch(updateUsuario({ usuario: this.userData as Usuarios }));
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
// src/app/pages/admin/dashboard/dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Material UI

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

// NgRx
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../../store/actions/auth.actions';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { AppState } from '../../../store/models/app-state';
import { selectUsuariosStats } from '../../../store/selectors/usuario.selectors';
import { loadUsuarios } from '../../../store/actions/usuario.actions';
import { selectCursosStats } from '../../../store/selectors/curso.selectors';
import { selectInscripcionesStats } from '../../../store/selectors/inscripcion.selectors';
import { loadInscripciones } from '../../../store/actions/inscripcion.actions';

// Modelo
import { Usuarios } from '../../../models/usuario.model';
import { loadCursos } from '../../../store/actions/curso.actions';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  user$: Observable<Usuarios | null>;
  usuariosStats$!: Observable<{ total: number, alumnos: number, profesores: number, administradores: number }>;
  currentDate: Date = new Date();
  cursosStats$!: Observable<{ total: number }>;
  inscripcionesStats$!: Observable<{ total: number }>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectUser);
    this.usuariosStats$ = this.store.select(selectUsuariosStats);
    this.cursosStats$ = this.store.select(selectCursosStats);
    this.inscripcionesStats$ = this.store.select(selectInscripcionesStats);
  }
  
  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user?.rol !== 'administrador') {
        this.router.navigate(['/']);
      }
    });
    this.store.dispatch(loadUsuarios());
    this.store.dispatch(loadCursos());
    this.store.dispatch(loadInscripciones());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
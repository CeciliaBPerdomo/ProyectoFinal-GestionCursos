import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Material UI
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

// Redux
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';

import { logout } from '../../../store/actions/auth.actions';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import { AppState } from '../../../store/models/app-state';

import { selectInscripcionesStatsPorAlumno } from '../../../store/selectors/inscripcion.selectors';
import * as InscripcionActions from '../../../store/actions/inscripcion.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-alumno-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    // Material UI
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  templateUrl: './dashboard-alumno.html',
  styleUrls: ['./dashboard-alumno.css']
})
export class AlumnoDashboardComponent implements OnInit {
  currentDate = new Date();
  user$: Observable<Usuarios | null>;
  stats$!: Observable<{ total: number; activos: number; finalizados: number; cancelados: number }>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
  
    // Cargar inscripciones del alumno logueado
    const alumnoId = Number(JSON.parse(localStorage.getItem('user') || '{}')?.usuarioId);
  console.log('Alumno ID:', alumnoId);

  if (alumnoId) {
    this.store.dispatch(InscripcionActions.loadInscripcionesByAlumno({ alumnoId }));

    this.stats$ = this.store.select(selectInscripcionesStatsPorAlumno(alumnoId));
    this.stats$.subscribe(stats => {
      console.log('Stats alumno:', stats);
    });
  }
  

    // Redirección si el rol no es 'alumno'
    firstValueFrom(this.user$).then(user => {
      if (user?.rol !== 'alumno') {
        this.router.navigate(['/']);
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}

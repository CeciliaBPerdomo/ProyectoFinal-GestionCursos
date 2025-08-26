import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';

// Material UI
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Redux
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';

import { logout } from '../../../store/actions/auth.actions';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import { AppState } from '../../../store/models/app-state';

import { selectInscripcionesStatsPorAlumno } from '../../../store/selectors/inscripcion.selectors';
import * as InscripcionActions from '../../../store/actions/inscripcion.actions';
import { updateUsuario } from '../../../store/actions/usuario.actions';

@Component({
  selector: 'app-alumno-dashboard',
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
    MatSelectModule,
  ],
  templateUrl: './dashboard-alumno.html',
  styleUrls: ['./dashboard-alumno.css']
})

export class AlumnoDashboardComponent implements OnInit {
  currentDate = new Date();
  user$: Observable<Usuarios | null>;
  stats$!: Observable<{ total: number; activos: number; finalizados: number; cancelados: number }>;

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
      if (user) {
        this.userData = { ...user };
      }
    });

    // Cargar inscripciones del alumno logueado
    const alumnoId = Number(JSON.parse(localStorage.getItem('user') || '{}')?.usuarioId);

    if (alumnoId) {
      this.store.dispatch(InscripcionActions.loadInscripcionesByAlumno({ alumnoId }));
      this.stats$ = this.store.select(selectInscripcionesStatsPorAlumno(alumnoId));
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

  enableEdit(): void {
    this.editMode = true;
  }

  saveChanges(): void {
   if (!this.userData.usuarioId) return;

  // Desactivar edición
  this.editMode = false;

  // Despachar action para actualizar el usuario en el store y backend
  this.store.dispatch(updateUsuario({ usuario: this.userData as Usuarios }));

  // Opcional: mostrar un mensaje de confirmación
  console.log('Datos enviados a actualizar:', this.userData);
  }

}

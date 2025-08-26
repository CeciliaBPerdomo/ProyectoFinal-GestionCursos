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
import { Observable, of } from 'rxjs';

import { logout } from '../../../store/actions/auth.actions';
import { updateUsuario } from '../../../store/actions/usuario.actions';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import { AppState } from '../../../store/models/app-state';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
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
  stats$: Observable<{ 
    total: number; 
    activos: number; 
    finalizados: number;
    cancelados: number;
  }>;

  editMode = false;
  userData: Partial<Usuarios> = {};

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
    this.stats$ = of({
      total: 8,
      activos: 5,
      finalizados: 2,
      cancelados: 1
    });
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.userData = { ...user };
      }
      if (user?.rol !== 'profesor') {
        this.router.navigate(['/']);
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
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
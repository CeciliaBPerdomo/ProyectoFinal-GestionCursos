import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { logout } from '../../../store/actions/auth.actions';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import { AppState } from '../../../store/models/app-state';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard-profesores.html',
  styleUrls: ['./dashboard-profesores.css']
})
export class ProfesorDashboardComponent implements OnInit {
  user$: Observable<Usuarios | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user?.rol !== 'profesor') {
        this.router.navigate(['/']);
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
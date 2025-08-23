// src/app/pages/admin/dashboard/dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../../store/actions/auth.actions';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import { AppState } from '../../../store/models/app-state';

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
  currentDate: Date = new Date();

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user?.rol !== 'administrador') {
        this.router.navigate(['/']);
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
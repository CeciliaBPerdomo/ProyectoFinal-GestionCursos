import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectIsAuthenticated, selectUser } from '../store/selectors/auth.selectors';
import { AppState } from '../store/models/app-state';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  canActivate() {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  canActivate() {
    return this.store.select(selectUser).pipe(
      take(1),
      map(user => {
        if (!user || user.rol !== 'administrador') {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
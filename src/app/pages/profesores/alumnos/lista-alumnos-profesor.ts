import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Material ui
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// reducers
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../store/models/app-state';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import { selectUsuarioError, selectUsuarioLoading, selectUsuariosFiltrados } from '../../../store/selectors/usuario.selectors';
import { loadUsuariosByRol, setFilterByRol } from '../../../store/actions/usuario.actions';


@Component({
    selector: 'app-lista-alumnos-profesor',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,

        // Material ui
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
    ],
    templateUrl: './lista-alumnos-profesor.html',
    styleUrls: ['./lista-alumnos-profesor.css']
})

export class ListaAlumnosProfesorComponent implements OnInit {
    alumnos$: Observable<Usuarios[]>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;



    displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'perfil'];
    constructor(
        private store: Store<AppState>,
        private snackBar: MatSnackBar
    ) {
        this.alumnos$ = this.store.select(selectUsuariosFiltrados);
        this.loading$ = this.store.select(selectUsuarioLoading);
        this.error$ = this.store.select(selectUsuarioError);
    }

    ngOnInit(): void {
        this.store.dispatch(setFilterByRol({ rol: 'alumno' }));
        this.store.dispatch(loadUsuariosByRol({ rol: 'alumno' }));

        // Manejo errores
        this.error$.subscribe(error => {
            if (error) {
                this.snackBar.open(`Error: ${error}`, 'Cerrar', { duration: 3000 });
            }
        });
    }
    refrescar(): void {
        this.store.dispatch(loadUsuariosByRol({ rol: 'alumno' }));
    }
}

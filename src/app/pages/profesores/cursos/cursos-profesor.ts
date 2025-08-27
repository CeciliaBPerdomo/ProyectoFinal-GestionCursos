import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Material ui
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// reducers
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../store/models/app-state';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Usuarios } from '../../../models/usuario.model';
import * as CursoActions from '../../../store/actions/curso.actions';
import { selectCursosFiltrados } from '../../../store/selectors/curso.selectors';
import { selectCursoLoading } from '../../../store/selectors/curso.selectors';

@Component({
    selector: 'app-cursos-profesor',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,

        // Material ui
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './cursos-profesor.html',
    styleUrls: ['./cursos-profesor.css']
})

export class CursosProfesorComponent implements OnInit {

    user$: Observable<Usuarios | null>;
    cursos$!: Observable<any[]>; // Aquí van los cursos filtrados

    loading$!: Observable<boolean>;
    error: string | null = null;
    displayedColumns: string[] = ['id', 'nombre', 'cantHoras', 'cantClases', 'comienzo', 'fin'];

    constructor(private store: Store<AppState>) {
        this.user$ = this.store.select(selectUser);
    }

    ngOnInit(): void {
        this.user$.subscribe(user => {
            if (!user) return;

            const profesorId = Number(user.usuarioId);
            this.store.dispatch(CursoActions.loadCursosByProfesor({ profesorId }));
            this.cursos$ = this.store.select(selectCursosFiltrados);

             this.loading$ = this.store.select(selectCursoLoading);
        });
    }

    refrescar() {
        this.user$.subscribe(user => {
            if (!user) return;
            const profesorId = Number(user.usuarioId);
            this.store.dispatch(CursoActions.loadCursosByProfesor({ profesorId }));
        });
    }

}

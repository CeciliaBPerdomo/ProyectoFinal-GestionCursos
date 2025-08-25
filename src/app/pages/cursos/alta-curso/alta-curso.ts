import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app-state';
import { addCurso } from '../../../store/actions/curso.actions';
import { selectCursoLoading, selectCursoError } from '../../../store/selectors/curso.selectors';
import { Observable } from 'rxjs';

import { selectUsuariosFiltrados } from '../../../store/selectors/usuario.selectors';
import { loadUsuariosByRol } from '../../../store/actions/usuario.actions';
import { Usuarios } from '../../../models/usuario.model';

// Models
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-alta-curso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule,
    MatFormFieldModule,

    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './alta-curso.html',
  styleUrls: ['./alta-curso.css']
})
export class AltaCurso implements OnInit {
  cursoForm!: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  profesores$!: Observable<Usuarios[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Inicializar después de que el constructor configure el store
    this.loading$ = this.store.select(selectCursoLoading);
    this.error$ = this.store.select(selectCursoError);
    this.profesores$ = this.store.select(selectUsuariosFiltrados);

    this.store.dispatch(loadUsuariosByRol({ rol: 'profesor' }));

    this.initForm();
    this.setupErrorHandling();
  }

  private initForm(): void {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantHoras: ['', [Validators.required, Validators.min(1)]],
      cantClases: ['', [Validators.required, Validators.min(1)]],
      comienzo: ['', Validators.required],
      fin: ['', Validators.required],
      profesorId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  private setupErrorHandling(): void {
    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(`Error: ${error}`, 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-error'
        });
      }
    });
  }

  guardar(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
      return;
    }

    const nuevoCurso: Curso = {
      ...this.cursoForm.value,
      // Asegurar que las fechas estén en formato string
      comienzo: new Date(this.cursoForm.value.comienzo).toISOString().split('T')[0],
      fin: new Date(this.cursoForm.value.fin).toISOString().split('T')[0]
    };

    this.store.dispatch(addCurso({ curso: nuevoCurso }));

    // Suscribirse al éxito de la operación
    const successSubscription = this.loading$.subscribe(loading => {
      if (!loading) {
        // Verificar si no hay error (éxito)
        const errorSubscription = this.error$.subscribe(error => {
          if (!error) {
            this.snackBar.open('Curso agregado correctamente ✅', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: 'snackbar-exito'
            });
            this.router.navigate(['/cursos/listado-cursos']);

            // Limpiar suscripciones
            successSubscription.unsubscribe();
            errorSubscription.unsubscribe();
          }
        });
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.cursoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}

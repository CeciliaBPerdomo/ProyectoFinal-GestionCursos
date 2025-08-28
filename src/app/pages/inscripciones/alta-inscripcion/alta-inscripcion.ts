import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { map, filter, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

// Material UI
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app-state';

// Acciones y selectores
import { addInscripcion } from '../../../store/actions/inscripcion.actions';
import { selectInscripcionLoading, selectInscripcionError } from '../../../store/selectors/inscripcion.selectors';
import { selectAllCursos } from '../../../store/selectors/curso.selectors';
import { selectAllAlumnos } from '../../../store/selectors/usuario.selectors';
import { loadUsuarios } from '../../../store/actions/usuario.actions';
import { loadCursos } from '../../../store/actions/curso.actions';

// Models
import { Inscripcion, EstadoInscripcion } from '../../../models/inscripcion.model';
import { Curso } from '../../../models/curso.model';
import { Usuarios as Alumno } from '../../../models/usuario.model';

@Component({
  selector: 'app-alta-inscripcion',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,

    //ui
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './alta-inscripcion.html',
  styleUrls: ['./alta-inscripcion.css']
})

export class AltaInscripcionComponent implements OnInit {
  inscripcionForm!: FormGroup;

  estados: EstadoInscripcion[] = ['activa', 'cancelada', 'finalizada'];
  cursos$: Observable<Curso[]>;
  alumnos$: Observable<Alumno[]>;

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.cursos$ = this.store.select(selectAllCursos);
    this.alumnos$ = this.store.select(selectAllAlumnos)
    this.loading$ = this.store.select(selectInscripcionLoading);
    this.error$ = this.store.select(selectInscripcionError);
  }

  ngOnInit(): void {
    this.initForm();
    this.setupErrorHandling();

    // Cargar datos si no están en el store
    this.store.dispatch(loadUsuarios());
    this.store.dispatch(loadCursos());

    this.cursos$ = this.store.select(selectAllCursos).pipe(
      map(cursos => cursos.map(c => ({
        ...c,
        cursoId: Number((c as any).CursoId)
      })))
    );

    this.alumnos$ = this.store.select(selectAllAlumnos).pipe(
      map(alumnos => alumnos.map(a => ({ ...a, id: Number(a.id) })))
    );
  }

  private initForm(): void {
    this.inscripcionForm = this.fb.group({
      cursoId: [null, [Validators.required]],
      alumnoId: [null, [Validators.required]],
      fechaInsc: [new Date().toISOString().split('T')[0], Validators.required],
      estado: ['activa', Validators.required],
      inscriptorId: [1, Validators.required]
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

  onSubmit(): void {
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
      return;
    }

    const nuevaInscripcion: Inscripcion = {
      ...this.inscripcionForm.value,
      cursoId: Number(this.inscripcionForm.value.cursoId),
      alumnoId: Number(this.inscripcionForm.value.alumnoId),
      inscriptorId: Number(this.inscripcionForm.value.inscriptorId)
    };

    this.store.dispatch(addInscripcion({ inscripcion: nuevaInscripcion }));
    this.subscription.unsubscribe();
    this.subscription = new Subscription();

    this.subscription.add(
      this.loading$.pipe(
        filter(loading => !loading),
        take(1)
      ).subscribe(() => {
        this.subscription.add(
          this.error$.pipe(take(1)).subscribe(error => {
            if (!error) {
              this.snackBar.open('Inscripción creada con éxito 🎉', 'Cerrar', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'snackbar-success'
              });
            }
          })
        );
      })
    );
  }

  campoInvalido(campo: string): boolean {
    const control = this.inscripcionForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  getUsuarioId(alumno: any): number {
    return alumno.usuarioId || alumno.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
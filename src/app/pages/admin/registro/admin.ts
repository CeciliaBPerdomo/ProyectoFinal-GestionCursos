import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app-state';
import { addUsuario } from '../../../store/actions/usuario.actions';
import { selectUsuarioLoading, selectUsuarioError } from '../../../store/selectors/usuario.selectors';

// Material UI
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

// Models
import { Usuarios } from '../../../models/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  usuarioForm!: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Inicializar después de que el constructor haya configurado el store
    this.loading$ = this.store.select(selectUsuarioLoading);
    this.error$ = this.store.select(selectUsuarioError);
    
    this.initForm();
    this.setupErrorHandling();
  }

  private initForm(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      rol: ['', Validators.required],
      password: ['', Validators.required],
      perfil: ['', Validators.required],
    });
  }

  private setupErrorHandling(): void {
    this.error$.subscribe(error => {
      if (error) {
        this.mensaje = '❌ Error al registrar usuario';
        this.snackBar.open(error, 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.mensaje = '';

    const nuevoUsuario: Omit<Usuarios, 'usuarioId'> = {
      ...this.usuarioForm.value
    };

    this.store.dispatch(addUsuario({ usuario: nuevoUsuario as Usuarios }));

    // Resetear el formulario después de un tiempo si la operación fue exitosa
    setTimeout(() => {
      if (this.mensaje === '') {
        this.mensaje = '✅ Usuario registrado correctamente';
        this.usuarioForm.reset();
        this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', { 
          duration: 2000 
        });
      }
    }, 1000);
  }
}
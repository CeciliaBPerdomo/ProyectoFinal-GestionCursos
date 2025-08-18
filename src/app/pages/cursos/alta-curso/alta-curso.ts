import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CursoService } from '../../../services/curso.service';
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
    MatSnackBarModule
  ],
  templateUrl: './alta-curso.html',
  styleUrls: ['./alta-curso.css']
})
export class AltaCurso implements OnInit {
  cursoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      duracion: [null, [Validators.required, Validators.min(1)]]
    });
  }

  guardar(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched(); // muestra todos los errores
      return;
    }

    const nuevoCurso: Curso = this.cursoForm.value;

    this.cursoService.agregarCurso(nuevoCurso).subscribe({
      next: (cursoAgregado) => {
        this.snackBar.open('Curso agregado correctamente ✅', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'snackbar-exito'
        });
        this.router.navigate(['/cursos-admin']);
      },
      error: (err) => {
        console.error('Error al agregar curso', err);
        this.snackBar.open('Error al agregar el curso ❌', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'snackbar-error'
        });
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.cursoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './alta-curso.html',
  styleUrls: ['./alta-curso.css']
})

export class AltaCurso {
  nuevoCurso: Curso = {
    id: undefined,
    nombre: '',
    descripcion: '',
    fechaInicio: new Date(),
    duracion: 0
  };

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  guardar(): void {
    if (!this.nuevoCurso.nombre.trim()) {
      this.snackBar.open('El nombre del curso es obligatorio', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-error'
      });
      return;
    }

    this.cursoService.agregarCurso(this.nuevoCurso);
    this.snackBar.open('Curso agregado correctamente ✅', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'snackbar-exito'
    });

    this.router.navigate(['/cursos-admin']);
  }
}

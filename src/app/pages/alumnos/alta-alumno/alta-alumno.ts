// app/pages/alumnos/alta-alumno/alta-alumno.ts
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Material ui
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

// Service
import { AlumnoService } from '../../../services/alumno.service';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-alta-alumno',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
     MatSelectModule 
  ],
  templateUrl: './alta-alumno.html',
  styleUrls: ['./alta-alumno.css']
})

export class AltaAlumno {
  alumnoForm: FormGroup;
  cursos: Curso[] = [];

  constructor(
    private fb: FormBuilder,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cursoId: [null]
    });
    this.cursos = this.cursoService.getCursos();
  }

  onSubmit() {
    if (this.alumnoForm.valid) {
      this.alumnoService.agregarAlumno(this.alumnoForm.value);
      this.snackBar.open('Alumno agregado con éxito 🎉', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-exito'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

      this.alumnoForm.reset();
      this.router.navigateByUrl('/alumnos-admin');
    }
  }
}

// src/app/pages/inscripciones/alta-inscripcion/alta-inscripcion.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Material UI
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Models y services
import { InscripcionService } from '../../../services/inscripcion.service';
import { Inscripcion, EstadoInscripcion } from '../../../models/inscripcion.model';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';

@Component({
  selector: 'app-alta-inscripcion',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './alta-inscripcion.html',
  styleUrls: ['./alta-inscripcion.css']
})


export class AltaInscripcionComponent implements OnInit {
  inscripcionForm!: FormGroup;
  estados: EstadoInscripcion[] = ['activa', 'cancelada', 'finalizada', 'sin inscripcion'];
  cursos: Curso[] = [];
  alumnos: Alumno[] = [];

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionService,
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
    this.alumnos = this.alumnoService.getAlumnos();

    this.inscripcionForm = this.fb.group({
      cursoId: [null, [Validators.required]],
      alumnoId: [null, [Validators.required]],
      fechaInscripcion: [new Date().toISOString().substring(0, 10), Validators.required],
      estado: ['activa', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
      return;
    }

    const nuevaId = Math.max(...this.inscripcionService.getInscripciones().map(i => i.id), 0) + 1;

    const nuevaInscripcion: Inscripcion = {
      id: nuevaId,
      alumnoId: Number(this.inscripcionForm.value.alumnoId),
      cursoId: Number(this.inscripcionForm.value.cursoId),
      fechaInscripcion: new Date(this.inscripcionForm.value.fechaInscripcion),
      estado: this.inscripcionForm.value.estado
    };

    this.inscripcionService.agregarInscripcion(nuevaInscripcion);

    this.snackBar.open('Inscripción creada con éxito 🎉', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    this.router.navigate(['/inscripciones-admin']);
  }
}

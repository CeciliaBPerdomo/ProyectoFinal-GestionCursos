// src/app/pages/inscripciones/alta-inscripcion/alta-inscripcion.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material UI
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
      private alumnoService: AlumnoService
  ) {}

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
      alumnoId: this.inscripcionForm.value.alumnoId,
      cursoId: this.inscripcionForm.value.cursoId,
      fechaInscripcion: new Date(this.inscripcionForm.value.fechaInscripcion),
      estado: this.inscripcionForm.value.estado
    };

    this.inscripcionService.agregarInscripcion(nuevaInscripcion);

    alert('Inscripción creada con éxito 🎉');

    // Solo reseteás, no recreás el form
    this.inscripcionForm.reset({
      fechaInscripcion: new Date().toISOString().substring(0, 10),
      estado: 'activa'
    });
  }
}

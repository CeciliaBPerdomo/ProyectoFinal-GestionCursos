import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

// Angular y Material
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Services y Models
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { InscripcionService } from '../../../services/inscripcion.service';

declare var bootstrap: any;

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './lista-alumnos.html',
  styleUrls: ['./lista-alumnos.css'],
})
export class ListaAlumnos implements OnInit, AfterViewInit {
  @Input() modo: 'admin' | 'alumno' = 'admin';

  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'cursoNombre'];
  alumnoEditandoId: number | null = null;
  alumnoEditado: Partial<Alumno> = {};

  alumnoIdAEliminar: number | null = null;
  modal: any;

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private inscripcionService: InscripcionService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const modoRuta = this.route.snapshot.data['modo'];
    this.modo = modoRuta === 'alumno' ? 'alumno' : 'admin';

    if (this.modo === 'admin') {
      this.displayedColumns.push('acciones');
    }

    // Cargar alumnos y cursos
    this.alumnoService.getAlumnos().subscribe(alumnos => {
      this.alumnos = alumnos;
    });

    this.cursoService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  getCursoNombre(id: number): string {
    const curso = this.cursos.find(c => c.id === id);
    return curso ? curso.nombre : 'Sin curso';
  }

  getEstadoInscripcion(alumnoId: number, cursoId: number): string {
    const inscripcion = this.inscripcionService
      .getInscripciones()
      .find(i => i.alumnoId === alumnoId && i.cursoId === cursoId);
    return inscripcion ? inscripcion.estado : 'Sin inscripción';
  }

  editarAlumno(alumno: Alumno): void {
    this.alumnoEditandoId = alumno.id;
    this.alumnoEditado = { ...alumno };
  }

  guardarAlumnoEditado(): void {
    if (this.alumnoEditandoId != null) {
      this.alumnoService.actualizarAlumno(this.alumnoEditado as Alumno).subscribe(() => {
        this.alumnoService.getAlumnos().subscribe(alumnos => {
          this.alumnos = [...alumnos];
        });

        this.alumnoEditandoId = null;
        this.alumnoEditado = {};
        this.snackBar.open('Alumno actualizado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-exito',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
    }
  }

  cancelarEdicion(): void {
    this.alumnoEditandoId = null;
    this.alumnoEditado = {};
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);

      const confirmBtn = document.getElementById('confirmDeleteBtn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          if (this.alumnoIdAEliminar !== null) {
            this.eliminarAlumnoConfirmado(this.alumnoIdAEliminar);
          }
        });
      }
    }
  }

  mostrarModalEliminar(id: number): void {
    this.alumnoIdAEliminar = id;
    this.modal.show();
  }

  eliminarAlumnoConfirmado(id: number): void {
    this.alumnoService.eliminarAlumno(id).subscribe(() => {
      this.alumnoService.getAlumnos().subscribe(alumnos => {
        this.alumnos = [...alumnos];
      });

      this.snackBar.open('Alumno eliminado 🗑️ correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: 'snackbar-exito',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.modal.hide();
    });
  }
}

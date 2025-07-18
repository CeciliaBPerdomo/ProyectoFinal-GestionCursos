import { Component, OnInit, Input } from '@angular/core';
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
import { InscripcionService } from '../../../services/inscripcion.service';

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
export class ListaAlumnos implements OnInit {
  @Input() modo: 'admin' | 'alumno' = 'admin';

  alumnos: Alumno[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'cursoNombre'];
  alumnoEditandoId: number | null = null;
  alumnoEditado: Partial<Alumno> = {};

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private inscripcionService: InscripcionService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const modoRuta = this.route.snapshot.data['modo'];
    this.modo = modoRuta === 'alumno' ? 'alumno' : 'admin';

    if (this.modo === 'admin') {
      this.displayedColumns.push('acciones');
    }

    this.alumnos = this.alumnoService.getAlumnos();
  }

  getCursoNombre(id: number): string {
    const curso = this.cursoService.getCursoPorId(id);
    return curso ? curso.nombre : 'Sin curso';
  }

  getEstadoInscripcion(alumnoId: number, cursoId: number): string {
    const inscripcion = this.inscripcionService.getInscripciones()
      .find(i => i.alumnoId === alumnoId && i.cursoId === cursoId);
    return inscripcion ? inscripcion.estado : 'Sin inscripción';
  }

  editarAlumno(alumno: Alumno): void {
    this.alumnoEditandoId = alumno.id;
    this.alumnoEditado = { ...alumno };
  }

  guardarAlumnoEditado(): void {
    if (this.alumnoEditandoId != null) {
      this.alumnoService.actualizarAlumno(this.alumnoEditado as Alumno);
      this.alumnos = [...this.alumnoService.getAlumnos()];
      this.alumnoEditandoId = null;
      this.alumnoEditado = {};
      this.snackBar.open('Alumno actualizado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: 'snackbar-exito',
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  cancelarEdicion(): void {
    this.alumnoEditandoId = null;
    this.alumnoEditado = {};
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Estás segura/o de que querés eliminar este alumno?')) {
      this.alumnoService.eliminarAlumno(id);
      this.alumnos = this.alumnoService.getAlumnos();
      this.snackBar.open('Alumno eliminado 🗑️ correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: 'snackbar-exito',
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  get cursos() {
    return this.cursoService.getCursos();
  }
}
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular y Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Models y Services
import { Curso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-listado-cursos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './listado-cursos.html',
  styleUrls: ['./listado-cursos.css']
})

export class ListadoCursos implements OnInit {
  cursos: Curso[] = [];
  cursoEditandoId: number | null = null;
  cursoEditado: Partial<Curso> = {};

  constructor(
    private cursoService: CursoService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
  }

  editarCurso(curso: Curso): void {
    this.cursoEditandoId = curso.id;
    this.cursoEditado = { ...curso };
  }

  guardarCursoEditado(): void {
    if (this.cursoEditandoId !== null) {
      this.cursoService.actualizarCurso(this.cursoEditado as Curso);
      this.cursos = [...this.cursoService.getCursos()];
      this.cursoEditandoId = null;
      this.cursoEditado = {};

      this.snackBar.open('Curso actualizado correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackbar-exito'
      });
    }
  }

  cancelarEdicion(): void {
    this.cursoEditandoId = null;
    this.cursoEditado = {};
  }


  eliminarCurso(id: number): void {
    if (confirm('¿Seguro que querés eliminar este curso?')) {
      this.cursoService.eliminarCurso(id);
      this.snackBar.open('Curso eliminado 🗑️ correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: 'snackbar-exito',
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.cursos = [...this.cursoService.getCursos()];

    }
  }
}
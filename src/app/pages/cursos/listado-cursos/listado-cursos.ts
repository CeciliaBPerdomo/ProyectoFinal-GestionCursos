import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular y Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  ],
  templateUrl: './listado-cursos.html',
  styleUrls: ['./listado-cursos.css']
})

export class ListadoCursos implements OnInit {
  cursos: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
  }

  editarCurso(curso: Curso): void {
    // Navegación a la ruta de edición
    // Podés ajustarlo según tu estructura
    console.log('Editar curso:', curso);
    // this.router.navigate(['/cursos/editar', curso.id]);
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
// app/pages/alumnos/lista-alumnos/lista-alumnos.ts
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

//Material UI 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Services y models 
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';

import { CursoService } from '../../../services/curso.service';
import { InscripcionService } from '../../../services/inscripcion.service';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './lista-alumnos.html',
  styleUrls: ['./lista-alumnos.css']
})

export class ListaAlumnos implements OnInit {
  @Input() modo: 'admin' | 'alumno' = 'admin';

  alumnos: Alumno[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'cursoNombre'];

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private inscripcionService: InscripcionService,
    private route: ActivatedRoute
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
    return curso ? curso.nombre : 'Desconocido';
  }

  getEstadoInscripcion(alumnoId: number, cursoId: number): string {
    // Buscamos la inscripción que corresponda al alumno y curso
    const inscripcion = this.inscripcionService.getInscripciones()
      .find(i => i.alumnoId === alumnoId && i.cursoId === cursoId);
    return inscripcion ? inscripcion.estado : 'Sin inscripción';
  }

  eliminarAlumno(id: number): void {
  const confirmacion = confirm('¿Estás segura de que querés eliminar este alumno?');

  if (confirmacion) {
    this.alumnoService.eliminarAlumno(id);
    this.alumnos = this.alumnoService.getAlumnos(); 
  }
}

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { UsuarioService } from '../../../services/usuarios.services';
import { Usuarios } from '../../../models/usuario.model';

@Component({
  selector: 'app-listado-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './listado-alumnos.html',
  styleUrls: ['./listado-alumnos.css']
})

export class ListadoAlumnos implements OnInit {
  alumnos: Usuarios[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'perfil', 'rol', 'acciones'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos(): void {
    this.usuarioService.getUsuariosPorRol('alumno').subscribe({
      next: (res) => this.alumnos = res,
      error: (err) => console.error('Error al obtener alumnos:', err)
    });
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este alumno?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => this.alumnos = this.alumnos.filter(a => a.usuarioId !== id),
        error: (err) => console.error('Error al eliminar alumno:', err)
      });
    }
  }
}

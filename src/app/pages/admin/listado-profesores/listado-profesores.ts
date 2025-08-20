import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { UsuarioService } from '../../../services/usuarios.services';
import { Usuarios } from '../../../models/usuario.model';

@Component({
  selector: 'app-listado-profesores',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './listado-profesores.html',
  styleUrls: ['./listado-profesores.css']
})
export class ListadoProfesores implements OnInit {
  profesores: Usuarios[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'perfil', 'rol', 'acciones'];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores(): void {
    this.usuarioService.getUsuariosPorRol('profesor').subscribe({
      next: (res) => this.profesores = res,
      error: (err) => console.error('Error al obtener profesores:', err)
    });
  }

  eliminarProfesor(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este profesor?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => this.profesores = this.profesores.filter(p => p.usuarioId !== id),
        error: (err) => console.error('Error al eliminar profesor:', err)
      });
    }
  }
}

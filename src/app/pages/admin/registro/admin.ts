// src/app/components/admin/admin.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Services y models
import { UsuarioService } from '../../../services/usuario.service';
import { Usuarios } from '../../../models/usuario.model';

// Material ui
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  usuarioForm!: FormGroup;
  loading = false;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      rol: ['', Validators.required],
      password: ['', Validators.required],
      perfil: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.mensaje = '';

    // Creamos el usuario sin el ID, MockAPI lo genera
    const nuevoUsuario: Omit<Usuarios, 'usuarioId'> = {
      ...this.usuarioForm.value
    };

    this.usuarioService.agregarUsuario(nuevoUsuario).subscribe({
      next: (res) => {
        this.mensaje = '✅ Usuario registrado correctamente';
        this.usuarioForm.reset();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        this.mensaje = '❌ Error al registrar usuario';
        this.loading = false;
      }
    });
  }
}
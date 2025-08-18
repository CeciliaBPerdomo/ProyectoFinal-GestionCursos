import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="inicio-container">
      <mat-card class="inicio-card">
        <h1>Bienvenido a la plataforma 🌟</h1>
        <p>Desde aquí puedes navegar a Alumnos, Cursos e Inscripciones mediante la barra de navegación superior.</p>
      </mat-card>
    </div>
  `,
  styles: [`
    .inicio-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
    }

    .inicio-card {
      text-align: center;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      max-width: 600px;
      width: 100%;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 16px;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 0;
    }
  `]
})
export class InicioComponent {}

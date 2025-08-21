//app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
  ],
  template: `
  <div class="app-background">
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  </div>
`,
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'Gestión de Cursos';
}
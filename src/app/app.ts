//app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
  <div class="app-background">
    <router-outlet></router-outlet>
  </div>
`,
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'Gestión de Cursos';
}
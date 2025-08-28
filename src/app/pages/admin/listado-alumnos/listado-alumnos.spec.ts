import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAlumnos } from './listado-alumnos';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AlumnoService } from '../../../services/alumno.service';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// Mock servicios
const mockAlumnoService = {
  getAlumnos: () => of([]),
  eliminarAlumno: (id: number) => of(undefined),
  actualizarAlumno: (alumno: any) => of(alumno)
};

const mockCursoService = {
  getCursos: () => of([]),
  getCursoPorId: (id: number) => of({ id, nombre: 'Curso Test' })
};

// Mock ActivatedRoute
const mockActivatedRoute = {
  snapshot: { params: {} },
  paramMap: of({})
};

// Mock global bootstrap
(window as any).bootstrap = {
  Modal: class {
    show() {}
    hide() {}
  }
};

describe('ListadoAlumnos', () => {
  let component: ListadoAlumnos;
  let fixture: ComponentFixture<ListadoAlumnos>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAlumnos],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: AlumnoService, useValue: mockAlumnoService },
        { provide: CursoService, useValue: mockCursoService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClientTesting() // <--- Esto le da un HttpClient mock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoAlumnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
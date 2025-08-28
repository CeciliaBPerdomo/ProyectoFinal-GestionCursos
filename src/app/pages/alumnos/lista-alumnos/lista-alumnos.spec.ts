import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAlumnos } from './lista-alumnos';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AlumnoService } from '../../../services/alumno.service';
import { CursoService } from '../../../services/curso.service';
import { InscripcionService } from '../../../services/inscripcion.service';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// --- Mocks de servicios ---
const mockAlumnoService = {
  getAlumnos: () => of([]),
  eliminarAlumno: (id: number) => of(undefined),
  actualizarAlumno: (alumno: any) => of(alumno)
};

const mockCursoService = {
  getCursos: () => of([]),
  getCursoPorId: (id: number) => of({ id, nombre: 'Curso Test' })
};

const mockInscripcionService = {
  getInscripciones: () => of([]),
  agregarInscripcion: (inscripcion: any) => of(inscripcion),
  eliminarInscripcion: (id: number) => of(undefined)
};

// --- Mock de ActivatedRoute con snapshot.data['modo'] ---
const mockActivatedRoute = {
  snapshot: {
    data: { modo: 'admin' } // importante, para que ngOnInit no falle
  },
  paramMap: of({
    get: (key: string) => key === 'modo' ? 'admin' : null
  })
};

// --- Mock global de Bootstrap Modal ---
(window as any).bootstrap = {
  Modal: class {
    show() {}
    hide() {}
  }
};

describe('ListaAlumnos', () => {
  let component: ListaAlumnos;
  let fixture: ComponentFixture<ListaAlumnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListaAlumnos,
        MatSnackBarModule // necesario si usás MatSnackBar en tu componente
      ],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: AlumnoService, useValue: mockAlumnoService },
        { provide: CursoService, useValue: mockCursoService },
        { provide: InscripcionService, useValue: mockInscripcionService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlumnos);
    component = fixture.componentInstance;

    fixture.detectChanges(); // dispara ngOnInit y ngAfterViewInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize without errors', () => {
    expect(() => component.ngOnInit()).not.toThrow();
  });

  it('should call eliminarAlumnoConfirmado', () => {
    spyOn(mockAlumnoService, 'eliminarAlumno').and.callThrough();
    spyOn(component, 'ngOnInit').and.callThrough(); // para simular init seguro

    component.alumnoIdAEliminar = 1;
    component.modal = { hide: jasmine.createSpy('hide') }; // mock del modal
    component.eliminarAlumnoConfirmado(1);

    expect(mockAlumnoService.eliminarAlumno).toHaveBeenCalledWith(1);
    expect(component.modal.hide).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaAlumno } from './alta-alumno';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CursoService } from '../../../services/curso.service';
import { AlumnoService } from '../../../services/alumno.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('AltaAlumno', () => {
  let component: AltaAlumno;
  let fixture: ComponentFixture<AltaAlumno>;
  let store: MockStore;
  let alumnoService: AlumnoService;
  let cursoService: CursoService;

  const mockAlumnoService = {
    agregarAlumno: jasmine.createSpy('agregarAlumno').and.returnValue(of({}))
  };

  const mockCursoService = {
    getCursos: jasmine.createSpy('getCursos').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AltaAlumno,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: AlumnoService, useValue: mockAlumnoService },
        { provide: CursoService, useValue: mockCursoService }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    alumnoService = TestBed.inject(AlumnoService);
    cursoService = TestBed.inject(CursoService);
    fixture = TestBed.createComponent(AltaAlumno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call agregarAlumno on onSubmit when form is valid', () => {
    // Rellenamos el formulario con datos válidos
    component.alumnoForm.setValue({
      nombre: 'Juan Perez',
      email: 'juan@example.com',
      cursoId: null
    });

    component.onSubmit();

    expect(mockAlumnoService.agregarAlumno).toHaveBeenCalledWith({
      nombre: 'Juan Perez',
      email: 'juan@example.com',
      cursoId: null
    });
  });

  it('should not call agregarAlumno if form is invalid', () => {
    component.alumnoForm.setValue({
    nombre: '', 
    email: 'invalid-email', 
    cursoId: null
  });

    component.alumnoForm.markAllAsTouched();
    component.alumnoForm.updateValueAndValidity();

    component.onSubmit();

    expect(mockAlumnoService.agregarAlumno).not.toHaveBeenCalled();
  });
});

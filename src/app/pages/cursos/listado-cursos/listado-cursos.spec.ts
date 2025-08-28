import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCursos } from './listado-cursos';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ListadoCursos', () => {
  let component: ListadoCursos;
  let fixture: ComponentFixture<ListadoCursos>;
  let store: MockStore;

  beforeAll(() => {
    (window as any).bootstrap = {
      Modal: class {
        show() {}
        hide() {}
      }
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCursos, MatSnackBarModule], 
      providers: [
        provideMockStore({ initialState: {} }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ListadoCursos);
    component = fixture.componentInstance;
    spyOn(component as any, 'inicializarModal');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

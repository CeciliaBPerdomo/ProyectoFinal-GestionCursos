import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoProfesores } from './listado-profesores';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ListadoProfesores', () => {
  let component: ListadoProfesores;
  let fixture: ComponentFixture<ListadoProfesores>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoProfesores, MatSnackBarModule], 
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
    fixture = TestBed.createComponent(ListadoProfesores);
    component = fixture.componentInstance;

    if ((component as any).inicializarModal) {
      spyOn(component as any, 'inicializarModal');
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

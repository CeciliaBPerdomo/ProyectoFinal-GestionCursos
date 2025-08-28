import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoInscripciones } from './listado-inscripciones';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ListadoInscripciones', () => {
  let component: ListadoInscripciones;
  let fixture: ComponentFixture<ListadoInscripciones>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInscripciones],
      providers: [
        provideMockStore({ initialState: {} }),
        provideHttpClientTesting(), 
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
    fixture = TestBed.createComponent(ListadoInscripciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

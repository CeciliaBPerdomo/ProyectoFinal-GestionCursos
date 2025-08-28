import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaCurso } from './alta-curso';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AltaCurso', () => {
  let component: AltaCurso;
  let fixture: ComponentFixture<AltaCurso>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaCurso],
      providers: [
        provideMockStore({ initialState: {} }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1' 
            }),
            snapshot: { paramMap: { get: (key: string) => '1' } } 
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AltaCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaInscripcionComponent } from './alta-inscripcion';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AltaInscripcionComponent', () => {
  let component: AltaInscripcionComponent;
  let fixture: ComponentFixture<AltaInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaInscripcionComponent],
      providers: [
        provideMockStore({ initialState: {} }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }), 
            snapshot: { paramMap: { get: (key: string) => '1' } } 
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

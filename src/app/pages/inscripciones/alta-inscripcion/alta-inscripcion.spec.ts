import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaInscripcion } from './alta-inscripcion';

describe('AltaInscripcion', () => {
  let component: AltaInscripcion;
  let fixture: ComponentFixture<AltaInscripcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaInscripcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaInscripcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

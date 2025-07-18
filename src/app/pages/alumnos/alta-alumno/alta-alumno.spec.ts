import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAlumno } from './alta-alumno';

describe('AltaAlumno', () => {
  let component: AltaAlumno;
  let fixture: ComponentFixture<AltaAlumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaAlumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaAlumno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

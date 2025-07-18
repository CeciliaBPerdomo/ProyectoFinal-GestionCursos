import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCurso } from './alta-curso';

describe('AltaCurso', () => {
  let component: AltaCurso;
  let fixture: ComponentFixture<AltaCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

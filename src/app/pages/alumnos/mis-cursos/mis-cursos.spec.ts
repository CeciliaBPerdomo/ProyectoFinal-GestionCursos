import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCursos } from './mis-cursos';

describe('MisCursos', () => {
  let component: MisCursos;
  let fixture: ComponentFixture<MisCursos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisCursos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisCursos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

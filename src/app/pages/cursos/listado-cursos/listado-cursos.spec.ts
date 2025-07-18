import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCursos } from './listado-cursos';

describe('ListadoCursos', () => {
  let component: ListadoCursos;
  let fixture: ComponentFixture<ListadoCursos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCursos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCursos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

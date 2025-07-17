import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumnos } from './lista-alumnos';

describe('ListaAlumnos', () => {
  let component: ListaAlumnos;
  let fixture: ComponentFixture<ListaAlumnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlumnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlumnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

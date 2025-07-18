import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoInscripciones } from './listado-inscripciones';

describe('ListadoInscripciones', () => {
  let component: ListadoInscripciones;
  let fixture: ComponentFixture<ListadoInscripciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInscripciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoInscripciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

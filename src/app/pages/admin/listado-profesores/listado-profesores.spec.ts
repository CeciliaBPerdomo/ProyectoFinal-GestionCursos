import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProfesores } from './listado-profesores';

describe('ListadoProfesores', () => {
  let component: ListadoProfesores;
  let fixture: ComponentFixture<ListadoProfesores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoProfesores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoProfesores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

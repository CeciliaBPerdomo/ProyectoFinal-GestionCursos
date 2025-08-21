import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAdministradores } from './listado-administradores';

describe('ListadoAdministradores', () => {
  let component: ListadoAdministradores;
  let fixture: ComponentFixture<ListadoAdministradores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAdministradores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoAdministradores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAdministradores } from './listado-administradores';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ListadoAdministradores', () => {
  let component: ListadoAdministradores;
  let fixture: ComponentFixture<ListadoAdministradores>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAdministradores], 
      providers: [
        provideMockStore({ initialState: {} })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ListadoAdministradores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

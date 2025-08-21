import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { usuarioReducer } from './usuario.reducer';
import { cursoReducer } from './curso.reducer';

export const reducers: ActionReducerMap<AppState> = {
  usuarios: usuarioReducer,
  cursos: cursoReducer,
};

export * from './usuario.reducer';
export * from './curso.reducer';
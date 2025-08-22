import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { usuarioReducer } from './usuario.reducer';
import { cursoReducer } from './curso.reducer';
import { inscripcionReducer } from './inscripcion.reducer';
import { authReducer } from './auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
  usuarios: usuarioReducer,
  cursos: cursoReducer,
  inscripciones: inscripcionReducer,
  auth: authReducer,
};

export * from './usuario.reducer';
export * from './curso.reducer';
export * from './inscripcion.reducer';
export * from './auth.reducer';
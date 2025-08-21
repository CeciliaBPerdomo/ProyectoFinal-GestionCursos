import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { usuarioReducer } from './usuario.reducer';

export const reducers: ActionReducerMap<AppState> = {
  usuarios: usuarioReducer
};

export * from './usuario.reducer';
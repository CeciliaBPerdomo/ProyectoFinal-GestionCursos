// store/selectors/usuario.selectors.spec.ts
import { 
  selectAllUsuarios,
  selectUsuariosFiltrados,
  selectUsuarioLoading,
  selectUsuarioError,
  selectCurrentUsuario,
  selectSearchTerm,
  selectUsuariosCountByRol,
  selectUsuariosStats,
  selectAllAlumnos
} from './usuario.selectors';
import { UsuariosState } from '../models/app-state';
import { Usuarios } from '../../models/usuario.model';

describe('Usuarios Selectors', () => {

  const mockUsuarios: Usuarios[] = [
    { usuarioId: 1, email: 'a@mail.com', password: '123', nombre: 'Alice', direccion: '', telefono: '', perfil: '', rol: 'alumno' },
    { usuarioId: 2, email: 'b@mail.com', password: '123', nombre: 'Bob', direccion: '', telefono: '', perfil: '', rol: 'profesor' },
    { usuarioId: 3, email: 'c@mail.com', password: '123', nombre: 'Charlie', direccion: '', telefono: '', perfil: '', rol: 'alumno' },
    { usuarioId: 4, email: 'd@mail.com', password: '123', nombre: 'Dana', direccion: '', telefono: '', perfil: '', rol: 'administrador' }
  ];

  const mockState: UsuariosState = {
    usuarios: mockUsuarios,
    usuariosFiltrados: mockUsuarios,
    filterRol: "",
    currentUsuario: null,
    loading: false,
    error: null,
    searchTerm: ''
  };

  it('should select all usuarios', () => {
    const result = selectAllUsuarios.projector(mockState);
    expect(result.length).toBe(4);
  });

  it('should select filtered usuarios without filter', () => {
    const result = selectUsuariosFiltrados.projector(mockUsuarios, "");
    expect(result.length).toBe(4);
  });

  it('should select filtered usuarios with filter', () => {
    const result = selectUsuariosFiltrados.projector(mockUsuarios, 'alumno');
    expect(result.length).toBe(2);
    expect(result.every(u => u.rol === 'alumno')).toBeTrue();
  });

  it('should select loading state', () => {
    const result = selectUsuarioLoading.projector(mockState);
    expect(result).toBe(false);
  });

  it('should select error state', () => {
    const result = selectUsuarioError.projector(mockState);
    expect(result).toBeNull();
  });

  it('should select current usuario', () => {
    const result = selectCurrentUsuario.projector(mockState);
    expect(result).toBeNull();
  });

  it('should select search term', () => {
    const result = selectSearchTerm.projector(mockState);
    expect(result).toBe('');
  });

  it('should count usuarios by rol', () => {
    const selector = selectUsuariosCountByRol('alumno');
    const result = selector.projector(mockUsuarios);
    expect(result).toBe(2);
  });

  it('should return stats', () => {
    const result = selectUsuariosStats.projector(mockUsuarios);
    expect(result.total).toBe(4);
    expect(result.alumnos).toBe(2);
    expect(result.profesores).toBe(1);
    expect(result.administradores).toBe(1);
  });

  it('should return all alumnos', () => {
    const result = selectAllAlumnos.projector(mockUsuarios);
    expect(result.length).toBe(2);
    expect(result.every(u => u.rol === 'alumno')).toBeTrue();
  });

});

// src/app/store/models/auth.model.spec.ts
import { initialAuthState } from './auth.model';

describe('AuthState initial values', () => {
  it('should have correct initialAuthState', () => {
    expect(initialAuthState.user).toBeNull();
    expect(initialAuthState.token).toBeNull();
    expect(initialAuthState.isLoading).toBeFalse();
    expect(initialAuthState.error).toBeNull();
    expect(initialAuthState.isAuthenticated).toBeFalse();
  });
});

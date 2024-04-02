import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service.ts3';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should set isAuthenticated to true after login', () => {
      service.login();
      expect(service.isAuthenticatedUser()).toBe(true);
    });
  });

  describe('logout', () => {
    it('should set isAuthenticated to false after logout', () => {
      service.login(); // Ensure user is logged in before logout
      service.logout();
      expect(service.isAuthenticatedUser()).toBe(false);
    });
  });

  describe('isAuthenticatedUser', () => {
    it('should return false if user is not authenticated', () => {
      expect(service.isAuthenticatedUser()).toBe(false);
    });

    it('should return true if user is authenticated', () => {
      service.login(); // Ensure user is logged in
      expect(service.isAuthenticatedUser()).toBe(true);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { GuardService } from './guard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

describe('GuardService', () => {
  let service: GuardService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [HttpClient, AuthService, GuardService]
    });
    service = TestBed.inject(GuardService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to login page if user is not authenticated', () => {
    const snapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const isAuthenticatedUserSpy = jest.spyOn(authService, 'isAuthenticatedUser').mockReturnValue(false);
    const routerNavigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    const canActivateResult = service.canActivate(snapshot, state);

    expect(isAuthenticatedUserSpy).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/auth/']);
    expect(canActivateResult).toEqual(false);
  });

});

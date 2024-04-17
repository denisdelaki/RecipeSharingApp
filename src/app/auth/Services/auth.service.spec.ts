import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [AuthService]
      });
      service = TestBed.inject(AuthService);
    })
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
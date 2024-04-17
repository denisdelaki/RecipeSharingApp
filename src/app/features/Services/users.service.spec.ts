import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [UsersService] 
      });
      service = TestBed.inject(UsersService);
    })
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 
});
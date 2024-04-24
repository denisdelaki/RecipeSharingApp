import { TestBed, waitForAsync } from '@angular/core/testing';
import {  HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController; 

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule], 
        providers: [UsersService]
      });
      service = TestBed.inject(UsersService);
      httpMock = TestBed.inject(HttpTestingController); 
    })
  );

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    const userId = '123';
    const dummyUserData = { id: userId, name: 'John Doe' };

    service.getuserData(userId).subscribe(userData => {
      expect(userData).toEqual(dummyUserData);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserData);
  });

  it('should update user data', () => {
    const userId = '123';
    const updatedUserData = { name: 'Jane Doe' };

    service.updateUserData(userId, updatedUserData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });
});

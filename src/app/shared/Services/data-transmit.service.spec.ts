import { TestBed } from '@angular/core/testing';

import { DataTransmitService } from './data-transmit.service';

describe('DataTransmitService', () => {
  let service: DataTransmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTransmitService]
    });
    service = TestBed.inject(DataTransmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should transmit isLoggedIn correctly', () => {
    let receivedValue: boolean | undefined;
  
    // Subscribe to isLoggedIn$ to track the emitted value
    service.isLoggedIn$.subscribe((value) => {
      receivedValue = value;
    });
  
    // Call transmitIsLoggedIn with true
    service.transmitIsLoggedIn(true);
  
    // Expect the received value to be true
    expect(receivedValue).toEqual(true);
  
    // Call transmitIsLoggedIn with false
    service.transmitIsLoggedIn(false);
  
    // Expect the received value to be false
    expect(receivedValue).toEqual(false);
  });
  
  it('should set searchedData correctly', () => {
    let receivedValue: any[] | undefined;
    // Subscribe to searchedData$ to track the emitted value
    service.searchedData$.subscribe((value) => {
      receivedValue = value;
    });
    // Call setsearchedData
    service.setsearchedData([]);
    // Expect the received value to be []
    expect(receivedValue).toEqual([]);
    // Call setsearchedData
    service.setsearchedData([1,2,3]);
    // Expect the received value to be [1,2,3]
    expect(receivedValue).toEqual([1,2,3]);

  })
  
});

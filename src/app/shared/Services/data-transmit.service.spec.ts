import { TestBed } from '@angular/core/testing';

import { DataTransmitService } from './data-transmit.service';

describe('DataTransmitService', () => {
  let service: DataTransmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTransmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

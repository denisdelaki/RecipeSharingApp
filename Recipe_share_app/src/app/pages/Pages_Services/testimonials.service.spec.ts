import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestimonialsService } from './testimonials.service';

describe('TestimonialsService', () => {
  let service: TestimonialsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestimonialsService]
    });
    service = TestBed.inject(TestimonialsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getData', () => {
    it('should return testimonials data from API', () => {
      const mockData = [{ id: 1, message: 'Testimonial 1' }, { id: 2, message: 'Testimonial 2' }];

      service.getData().subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const req = httpTestingController.expectOne('http://localhost:3000/testimonials');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });
  });
});

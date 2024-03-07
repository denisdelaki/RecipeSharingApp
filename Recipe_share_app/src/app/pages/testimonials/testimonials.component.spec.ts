import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestimonialsComponent } from './testimonials.component';
import { TestimonialsService } from '../Pages_Services/testimonials.service';
import { of } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;
  let testimonialsService: jest.Mocked<TestimonialsService>;

  beforeEach(async () => {
    testimonialsService = {
      getData: jest.fn(),
    } as unknown as jest.Mocked<TestimonialsService>;

    await TestBed.configureTestingModule({
      declarations: [TestimonialsComponent],
      providers: [
        { provide: TestimonialsService, useValue: testimonialsService },
        MatStepper
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch testimonials data on initialization', () => {
    const testData = [{ id: 1, review: 'Test review 1' }, { id: 2, review: 'Test review 2' }];
    testimonialsService.getData.mockReturnValue(of(testData));

    fixture.detectChanges();

    expect(testimonialsService.getData).toHaveBeenCalled();
    expect(component.reviews).toEqual(testData);
  });

  it('should slide to next review', () => {
    component.reviews = [{ id: 1, review: 'Test review 1' }, { id: 2, review: 'Test review 2' }];
  
    const stepper: Partial<MatStepper> = {
      selectedIndex: 0,
      next: jest.fn(),
    };
    component.stepper = stepper as MatStepper;
  
    fixture.detectChanges(); 
  
    component.slideToNext();
  
    expect(stepper.next).toHaveBeenCalled();
  });
  
  it('should slide to previous review', () => {
    component.reviews = [{ id: 1, review: 'Test review 1' }, { id: 2, review: 'Test review 2' }];
  
    const stepper: Partial<MatStepper> = {
      selectedIndex: 1,
      previous: jest.fn(),
    };
    component.stepper = stepper as MatStepper;
  
    fixture.detectChanges(); 
  
    component.slideToPrev();
  
    expect(stepper.previous).toHaveBeenCalled();
  });  
});

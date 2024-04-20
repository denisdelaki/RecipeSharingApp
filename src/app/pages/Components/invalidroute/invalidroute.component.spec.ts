import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidrouteComponent } from './invalidroute.component';

describe('InvalidrouteComponent', () => {
  let component: InvalidrouteComponent;
  let fixture: ComponentFixture<InvalidrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvalidrouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

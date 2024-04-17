/////tests 
// MyprofileComponent › should create
// should call login method when login button is clicked: This test checks if the login method is called when the login button is clicked.
// should call register method when register button is clicked: This test checks if the register method is called when the register button is clicked.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { By } from '@angular/platform-browser';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger click event on register button', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges(); 
  });

  it('should call login method when login button is clicked', () => {
    const loginSpy = jest.spyOn(component, 'login');
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    expect(loginSpy).toHaveBeenCalled();
  });
});
// Test Suite: NavigationComponent

//   Test Case: should create
//     Test: Ensure the component is created successfully
//     Expectation: Component should be truthy
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { ConfirmLogoutDialogComponent } from '../../Interceptor/confirm-logout-dialog/confirm-logout-dialog.component';
import { DataTransmitService } from '../../Services/data-transmit.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let dialog: MatDialog;
  let dataTransmitService: DataTransmitService;

  class MatDialogMock {
    open() {
      return { afterClosed: () => of(true) };
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [HttpClientModule, MatDialogModule],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: DataTransmitService, useValue: { isLoggedIn$: of(true) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    dialog = TestBed.inject(MatDialog);
    dataTransmitService = TestBed.inject(DataTransmitService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   Test Suite: Toggle Button

  //     Test Case: should exist
  //       Test: Verify the existence of the toggle button element
  //       Expectation: Toggle button should exist in the component's HTML
  //     Test Case: should have correct attributes
  //       Test: Check if the toggle button has correct attributes
  //       Expectation: Toggle button should have the correct attributes

  describe('Toggle Button', () => {
    it('should exist', () => {
      const toggleButton = fixture.nativeElement.querySelector('.navbar-toggler');
      expect(toggleButton).toBeTruthy();
    });

    it('should have correct attributes', () => {
      const toggleButton = fixture.nativeElement.querySelector('.navbar-toggler');
      expect(toggleButton.getAttribute('type')).toEqual('button');
      expect(toggleButton.getAttribute('data-bs-toggle')).toEqual('collapse');
      expect(toggleButton.getAttribute('aria-controls')).toEqual('navbarNav');
      expect(toggleButton.getAttribute('aria-expanded')).toEqual('false');
      expect(toggleButton.getAttribute('aria-label')).toEqual('Toggle navigation');
    });
  });

  //   Test Suite: Navigation Links

  //     Test Case: should contain Home, Recipes, Testimonials, and About Us links
  //       Test: Verify existence and text content of navigation links
  //       Expectation: All navigation links should exist and have correct text content
  //     Test Case: should have correct styling
  //       Test: Verify styling of navigation links
  //       Expectation: Navigation links should have correct styling

  describe('Navigation Links', () => {
    it('should contain Home, Recipes, Testimonials, and About Us links', () => {
      const homeLink = fixture.nativeElement.querySelector('.navbar-nav .nav-item:nth-child(1) .nav-link');
      const recipesLink = fixture.nativeElement.querySelector('.navbar-nav .nav-item:nth-child(2) .nav-link');
      const testimonialsLink = fixture.nativeElement.querySelector('.navbar-nav .nav-item:nth-child(3) .nav-link');
      const aboutUsLink = fixture.nativeElement.querySelector('.navbar-nav .nav-item:nth-child(4) .nav-link');

      expect(homeLink.textContent.trim()).toEqual('Home');
      expect(recipesLink.textContent.trim()).toEqual('Recipes');
      expect(testimonialsLink.textContent.trim()).toEqual('Testimonials');
      expect(aboutUsLink.textContent.trim()).toEqual('About Us');
    });

    it('should have correct styling', () => {
      const homeLink = fixture.nativeElement.querySelector('.navbar-nav .nav-item:nth-child(1) .nav-link');
      const recipesLink = fixture.nativeElement.querySelector('.navbar-nav .nav-item:nth-child(2) .nav-link');
      const testimonialsLink = fixture.nativeElement.querySelector('.navbar-nav .nav-item:nth-child(3) .nav-link');
      const aboutUsLink = fixture.nativeElement.querySelector('.navbar-nav .nav-item:nth-child(4) .nav-link');

      expect(homeLink.style.color).toEqual('black');
      expect(recipesLink.style.color).toEqual('black');
      expect(testimonialsLink.style.color).toEqual('black');
      expect(aboutUsLink.style.color).toEqual('black');
    });


  });

  it('should emit false on Login()', () => {
    const emitSpy = jest.spyOn(component.isSignup, 'emit');
    component.Login();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should emit true on Signup()', () => {
    const emitSpy = jest.spyOn(component.isSignup, 'emit');
    component.Signup();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should open dialog on confirmlogout()', () => {
    const openDialogSpy = jest.spyOn(dialog, 'open').mockReturnValue({ afterClosed: () => of(true) } as any);
    component.confirmlogout();
    expect(openDialogSpy).toHaveBeenCalledWith(ConfirmLogoutDialogComponent, { width: '350px' });
  });

  it('should remove loggedInUserId and set isLoggedIn to false on Logout()', () => {
    localStorage.setItem('loggedInUserId', '123');
    component.Logout();
    expect(localStorage.getItem('loggedInUserId')).toBeFalsy();
    expect(component.isLoggedIn).toBe(false);
  });

  it('should set isLoggedIn to false when UserId does not exist in localStorage', () => {
    localStorage.removeItem('loggedInUserId');
    component.Logout();
    expect(component.isLoggedIn).toBe(false);
  })

});

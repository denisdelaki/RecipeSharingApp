import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MyprofileComponent } from './myprofile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

describe('MyprofileComponent', () => {
  let component: MyprofileComponent;
  let fixture: ComponentFixture<MyprofileComponent>;
  let mockMatDialog: jest.Mocked<MatDialog>;
  let mockDialogRef: any;
  let router: Router;
  let userservice: UsersService;

  beforeEach(waitForAsync(() => {
    mockMatDialog = {
      open: jest.fn(() => mockDialogRef)
    } as unknown as jest.Mocked<MatDialog>;

    TestBed.configureTestingModule({
      declarations: [MyprofileComponent],
      imports: [MatDialogModule, HttpClientModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        FormBuilder,
        UsersService
      ]
    }).compileComponents();
    router=TestBed.inject(Router);
    userservice=TestBed.inject(UsersService);
    fixture = TestBed.createComponent(MyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open EditProfileComponent dialog when Edit method is called', () => {
    // Arrange
    mockDialogRef = { afterClosed: jest.fn() };
    mockMatDialog.open.mockReturnValue(mockDialogRef);

    // Act
    component.Edit();

    // Assert
    expect(mockMatDialog.open).toHaveBeenCalledWith(EditProfileComponent, {
      width: '550px',
      disableClose: true
    });
  });
   
  it('should call router.navigate when viewSavedRecipes is called', () => {
    // Arrange
   jest.spyOn(router, 'navigate')

    // Act
    component.viewSavedRecipes();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['/features/favorites']);
  })

  // it('should call userservice.getuserData when ngOnInit is called', () => {
  //   // Arrange
  //   jest.spyOn(userservice, 'getuserData');

  //   // Act
  //   component.ngOnInit();

  //   // Assert
  //   expect(userservice.getuserData).toHaveBeenCalled();
  // })

  // it('should fetch user data from local storage if available', () => {
  //   // Arrange
  //   localStorage.setItem('loggedInUserId', '123');
  //   jest.spyOn(userservice, 'getuserData');

  //   // Act
  //   component.ngOnInit();

  //   // Assert
  // //   expect(userservice.getuserData).toHaveBeenCalledWith('123');
  // // })


});

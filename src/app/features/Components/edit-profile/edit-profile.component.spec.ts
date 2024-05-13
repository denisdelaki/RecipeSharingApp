// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { EditProfileComponent } from './edit-profile.component';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { of } from 'rxjs';
// import { UsersService } from '../../Services/users.service';
// import { HttpClientModule } from '@angular/common/http';
// import { fakeAsync, tick } from '@angular/core/testing';

// describe('EditProfileComponent', () => {
//   let fixture: ComponentFixture<EditProfileComponent>;
//   let component: EditProfileComponent;
//   let formBuilder: FormBuilder;
//   let usersService: UsersService;
//   let matDialogRef: MatDialogRef<EditProfileComponent>;
//   let dialogRefCloseSpy: jest.SpyInstance;

//   beforeEach(async () => {
//     formBuilder = new FormBuilder();
//     usersService = {
//       getuserData: jest.fn(),
//       updateUserData: jest.fn()
//     } as unknown as UsersService;
//     matDialogRef = {
//       close: jest.fn()
//     } as unknown as MatDialogRef<EditProfileComponent>;

//     dialogRefCloseSpy = jest.spyOn(matDialogRef, 'close');
//     await TestBed.configureTestingModule({
//       declarations: [EditProfileComponent],
//       imports: [HttpClientModule, ReactiveFormsModule],
//       providers: [
//         FormBuilder,
//         { provide: UsersService, useValue: usersService },
//         { provide: MatDialogRef, useValue: matDialogRef },
//         { provide: MAT_DIALOG_DATA, useValue: {} }
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EditProfileComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create component instance', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should close the dialog when close method is called', () => {
//     component.close();
//     expect(dialogRefCloseSpy).toHaveBeenCalled();
//   });

  
//  it('should fetch user data and populate form fields on initialization', fakeAsync(() => {
//   const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
//   const mockUserData = {
//     fullName: 'John Doe',
//     email: 'john@example.com',
//     profilePicture: 'profile.jpg',
//     phoneNumber: '123456789',
//     address: '123 Street, City',
//     socials: {
//       facebook: 'facebook.com/johndoe',
//       twitter: 'twitter.com/johndoe',
//       instagram: 'instagram.com/johndoe',
//       blog: 'johndoe.com'
//     }
//   };

//   // Mock the return value of getuserData method
// //  const getuserData= jest.spyOn(usersService, 'getuserData').mockReturnValue(of(mockUserData));

//   // Simulate component initialization
//   component.ngOnInit();

//   // Flush pending asynchronous operations
//   tick();
//   // Log the output of userService.getuserData
//   // usersService.getuserData().subscribe(data => {
//     console.log(data);
//   });

//   // Ensure that ngOnInit method is called
//   expect(ngOnInitSpy).toHaveBeenCalled();
//   expect(getuserData).toHaveBeenCalledTimes(1);
//   // Expect the form fields to be populated with mock user data
//   expect(mockUserData).toEqual({
//     fullName: 'John Doe',
//     email: 'john@example.com',
//     profilePicture: 'profile.jpg',
//     phoneNumber: '123456789',
//     address: '123 Street, City',
//     socials: {
//       facebook: 'facebook.com/johndoe',
//       twitter: 'twitter.com/johndoe',
//       instagram: 'instagram.com/johndoe',
//       blog: 'johndoe.com'
//     }
//   });
// }));



//   it('should not call updateUserData when form is invalid', () => {
//     component.editProfile.setValue({
//       fullName: '', // Make the form invalid
//       email: 'john@example.com',
//       profilePicture: 'profile.jpg',
//       phoneNumber: '123456789',
//       address: '123 Street, City',
//       facebook: 'facebook.com/johndoe',
//       twitter: 'twitter.com/johndoe',
//       instagram: 'instagram.com/johndoe',
//       blog: 'johndoe.com'
//     });

//     component.save();

//     // expect(usersService.updateUserData).not.toHaveBeenCalled();
//     expect(dialogRefCloseSpy).not.toHaveBeenCalled();
//   });

//   it('should not call updateUserData when userId is not available', () => {
//     component.editProfile.setValue({
//       fullName: 'John Doe',
//       email: 'john@example.com',
//       profilePicture: 'profile.jpg',
//       phoneNumber: '123456789',
//       address: '123 Street, City',
//       facebook: 'facebook.com/johndoe',
//       twitter: 'twitter.com/johndoe',
//       instagram: 'instagram.com/johndoe',
//       blog: 'johndoe.com'
//     });

//     localStorage.removeItem('loggedInUserId');

//     component.save();

//     // expect(usersService.updateUserData).not.toHaveBeenCalled();
//     expect(dialogRefCloseSpy).not.toHaveBeenCalled();
//   });
// });

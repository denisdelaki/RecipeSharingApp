import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MyprofileComponent } from './myprofile.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { HttpClientModule } from '@angular/common/http';

describe('MyprofileComponent', () => {
  let component: MyprofileComponent;
  let fixture: ComponentFixture<MyprofileComponent>;
  let mockMatDialog: jest.Mocked<MatDialog>;
  let mockDialogRef: any;

  beforeEach(waitForAsync(() => {
    mockMatDialog = {
      open: jest.fn(() => mockDialogRef)
    } as unknown as jest.Mocked<MatDialog>;

    TestBed.configureTestingModule({
      declarations: [MyprofileComponent],
      imports: [MatDialogModule, HttpClientModule],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();

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
});

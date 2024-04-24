import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLogoutDialogComponent } from './confirm-logout-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmLogoutDialogComponent', () => {
  let component: ConfirmLogoutDialogComponent;
  let fixture: ComponentFixture<ConfirmLogoutDialogComponent>;
  let matDialogRefMock: Partial<MatDialogRef<ConfirmLogoutDialogComponent>>;

  beforeEach(async () => {
    matDialogRefMock = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ConfirmLogoutDialogComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmLogoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close with true when confirm() is called', () => {
    // Arrange: Spy on the close method of MatDialogRef
    const closeSpy = jest.spyOn(matDialogRefMock, 'close');

    // Act: Call the confirm method
    component.confirm();

    // Assert: Check that dialogRef.close was called with true
    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close with false when cancel() is called', () => {
    // Arrange: Spy on the close method of MatDialogRef
    const closeSpy = jest.spyOn(matDialogRefMock, 'close');

    // Act: Call the cancel method
    component.cancel();

    // Assert: Check that dialogRef.close was called with false
    expect(closeSpy).toHaveBeenCalledWith(false);
  });
});

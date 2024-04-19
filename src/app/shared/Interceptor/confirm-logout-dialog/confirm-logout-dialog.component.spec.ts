import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLogoutDialogComponent } from './confirm-logout-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmLogoutDialogComponent', () => {
  let component: ConfirmLogoutDialogComponent;
  let fixture: ComponentFixture<ConfirmLogoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmLogoutDialogComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
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
});

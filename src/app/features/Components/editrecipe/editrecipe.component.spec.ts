import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditrecipeComponent } from './editrecipe.component';
import { RecipesService } from '../../Services/recipes.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import NoopAnimationsModule

describe('EditrecipeComponent', () => {
  let component: EditrecipeComponent;
  let fixture: ComponentFixture<EditrecipeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditrecipeComponent],
        imports: [
          MatDialogModule,
          HttpClientModule,
          NoopAnimationsModule 
        ],
        providers: [
          RecipesService,
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: {} }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(EditrecipeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

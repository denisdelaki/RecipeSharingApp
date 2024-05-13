import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError,pipe, map, Observable, tap, throwError, from } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //User management API url
  private apiUrl = 'http://localhost:3000/users/';

  private isAuthenticated = false;

  private isSignupSource = new BehaviorSubject<boolean>(false);
  isSignup$ = this.isSignupSource.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient, 
    private snackBar: MatSnackBar) { }

  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000, panelClass: [panelClass] });
  }
  //pass the boolean value to check whether the login or signup button has been clicked by the user 
  setIsSignup(isSignup: boolean) {
    this.isSignupSource.next(isSignup);
  }

  
///firebase login
login(email: string, password: string): Observable<any> {
  return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
    tap(() => {
      this.isAuthenticated = true;
      this.openSnackBar('Successfully logged in', 'success-snackbar'); 
    }),
    catchError(error => {
      let errorMessage = 'Failed to log in';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/internal-error') {
        errorMessage = 'Server error, please try again later';
      }
      this.openSnackBar(errorMessage, 'error-snackbar'); 
      return throwError(() => new Error(error));
    })
  );
}


//firebase signup
signup(email: string, password: string): Observable<any> {
  return from(this.afAuth.createUserWithEmailAndPassword(email, password))
    .pipe(
      catchError((error) => {
        // Check if the error is due to email already being in use
        if (error.code === 'auth/email-already-in-use') {
          this.openSnackBar('User already exists', 'error-snackbar');
        } else {
          // For other errors, re-throw the error
          throw error;
        }
        return throwError(error);
      })
    );
}

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

     // Method to show error message using MatSnackBar
     private showErrorMessage(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 5000, 
        panelClass: ['error-snackbar'] 
      });
    }
}

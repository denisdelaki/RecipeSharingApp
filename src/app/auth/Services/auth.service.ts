import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //User management API url
  private apiUrl = 'http://localhost:3000/users/';

  private isSignupSource = new BehaviorSubject<boolean>(false);
  isSignup$ = this.isSignupSource.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000, panelClass: [panelClass] });
  }
  //pass the boolean value to check whether the login or signup button has been clicked by the user 
  setIsSignup(isSignup: boolean) {
    this.isSignupSource.next(isSignup);
  }

  //login of the user
  login(userId?: string): Observable<any> {
    if (userId) {
      // Fetch data for a single user
      return this.http.get<any>(`${this.apiUrl}${userId}`).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showErrorMessage('Failed to log in');
          return throwError(error);
        })
      );
    } else {
            // Fetch data for multiple users
      return this.http.get<any>(this.apiUrl).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showErrorMessage('Failed to fetch users');
          return throwError(error);
        })
      );
    }
  };


  //signup of the user 
  signup(userData:any): Observable<any>{
    console.log(userData);
    return this.http.post<any>(this.apiUrl, userData);
  }

     // Method to show error message using MatSnackBar
     private showErrorMessage(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 5000, 
        panelClass: ['error-snackbar'] 
      });
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //User management API url
  private apiUrl = 'http://localhost:3000/users/';

  private isAuthenticated = false;

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
    const url = userId ? `${this.apiUrl}${userId}` : this.apiUrl;
    const errorMessage = userId ? 'Failed to log in' : 'Failed to fetch users';
  
    return this.http.get<any>(url).pipe(
      tap((response: any) => {
        // Success
        this.isAuthenticated = true;
        
      }),
      catchError((error: HttpErrorResponse) => {
        // Error
        this.showErrorMessage(errorMessage);
        return throwError(error);
      })
    );
  }
  


  //signup of the user 
  signup(userData:any): Observable<any>{
    console.log(userData);
    return this.http.post<any>(this.apiUrl, userData);
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

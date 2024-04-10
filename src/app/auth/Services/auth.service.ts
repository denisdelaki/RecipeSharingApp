import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //User management API url
  private apiUrl = 'http://localhost:3000/users/';

  private isSignupSource = new BehaviorSubject<boolean>(false);
  isSignup$ = this.isSignupSource.asObservable();

  constructor(private http: HttpClient) { }
  //pass the boolean value to check whether the login or signup button has been clicked by the user 
  setIsSignup(isSignup: boolean) {
    this.isSignupSource.next(isSignup);
  }
  //login of the user
  login(userId?: string): Observable<any> {
    if (userId) {
      // Fetch data for a single user
      return this.http.get<any>(`${this.apiUrl}${userId}`);
    } else {
      // Fetch data for multiple users
      return this.http.get<any>(this.apiUrl);
    }
  };
  //signup of the user 
  signup(userData:any): Observable<any>{
    console.log(userData);
    return this.http.post<any>(this.apiUrl, userData);
  }
}

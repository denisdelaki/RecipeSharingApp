import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {}
///get users from the server 
  getuserData(userId?: string): Observable<any> {
    if (userId) {
      // Fetch data for a single user
      return this.http.get<any>(`${this.apiUrl}${userId}`);
    } else {
      // Fetch data for multiple users
      return this.http.get<any>(this.apiUrl);
    }
  }
  ///update user details 
  updateUserData(userId:any, userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}${userId}`, userData);
  }
}

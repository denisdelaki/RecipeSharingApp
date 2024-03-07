import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/user/';

  constructor(private http: HttpClient) {}
///get users from the server 
  getData(userId?: string): Observable<any> {
    if (userId) {
      // Fetch data for a single user
      return this.http.get<any>(`${this.apiUrl}${userId}`);
    } else {
      // Fetch data for multiple users
      return this.http.get<any>(this.apiUrl);
    }
  }
//create users during registration 

createusers(userData:any): Observable<any>{
  console.log(userData);
  return this.http.post<any>(this.apiUrl, userData);
}
//modify user data during profile editting 
updateUserData(userId:any, userData: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}${userId}`, userData);
}
}

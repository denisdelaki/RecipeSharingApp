import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private http: HttpClient) {}
///get users from the server 
updateUserData(userId: string, userData: any): Promise<void> {
//use realtime databse 
const userRef = this.db.object(`/users/${userId}`);
console.log(userData);
return userRef.update(userData);
}


}

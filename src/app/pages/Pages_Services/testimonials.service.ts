import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  private apiUrl = 'http://localhost:3000/testimonials';
  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}

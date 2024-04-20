import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransmitService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  //search data 
  private searchedDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public searchedData$: Observable<any[]> = this.searchedDataSubject.asObservable();

  constructor() { }

  transmitIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  //set searched data 
  setsearchedData(data: any[]): void {
    this.searchedDataSubject.next(data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}
  shopedetails: any;
  shopName: string = '';
  public productsUrl =
    'https://bengaluruswada.herokuapp.com/api/Food/getfoodposts?locationName=';
  GetFoodPosts(locationName: string): Observable<any> {
    return this.http.get<any>(this.productsUrl + locationName).pipe(
      tap((data) => console.log()),
      catchError(this.handleError)
    );
  }

  private locationUrl =
    'https://bengaluruswada.herokuapp.com/api/Food/getlocations';
  GetLocations(): Observable<any> {
    return this.http.get<any>(this.locationUrl).pipe(
      tap((data) => console.log('All : ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMesasge = '';
    if (err.error instanceof ErrorEvent) {
      errorMesasge = `An error occured : ${err.error.message}`;
    } else
      errorMesasge = `server returned code : ${err.status}, error message is : ${err.message}`;
    console.log(errorMesasge);
    return throwError(errorMesasge);
  }
}

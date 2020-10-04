import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

export interface MapBoxOutPut {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
}
@Injectable({
  providedIn: 'root',
})
export class SearchLocationService {
  constructor(private http: HttpClient) {}

  // search_word(query: string) {
  //   const url =
  //     'https://bengaluruswada.herokuapp.com/api/BengaluruStreetFood/locations';
  //   return this.http.get(url).pipe(
  //     map((res: MapBoxOutPut) => {
  //       return res.features;
  //     })
  //   );
  // }
  locationname: string = '';
  private productsUrl =
    'https://bengaluruswada.herokuapp.com/api/Food/getlocations';
  GetLocations(): Observable<any> {
    return this.http.get<any>(this.productsUrl).pipe(
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

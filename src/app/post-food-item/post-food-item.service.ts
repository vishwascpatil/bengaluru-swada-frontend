import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { PostFoodDetails } from './postFoodDetails';

@Injectable({
  providedIn: 'root',
})
export class PostFoodItemService {
  constructor(private http: HttpClient) {}
  public catergorylisturl =
    'https://bengaluruswada.herokuapp.com/api/Food/getcategorydetails';
  public savefooddetailsurl =
    'https://bengaluruswada.herokuapp.com/api/Food/savefooddetails';

  GetCategoryListDetails(): Observable<any> {
    return this.http
      .get<any>(this.catergorylisturl)
      .pipe(catchError(this.handleError));
  }

  saveshopdetails(PostFoodDetails: PostFoodDetails): Observable<any> {
    return this.http.post<any>(this.savefooddetailsurl, PostFoodDetails).pipe(
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

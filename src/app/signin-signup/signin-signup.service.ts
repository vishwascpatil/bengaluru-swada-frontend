// import { Injectable, ErrorHandler } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { ILatLong } from './Isignin-signup';
// import { JsonPipe } from '@angular/common';
// import { tap, catchError } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root',
// })
// export class SigninSignupService {
//   constructor(private http: HttpClient) {}
//   private productsUrl = 'https://localhost:44358/api/BengaluruStreetFood/';
//   getproduct(): Observable<ILatLong> {
//     return this.http.get<ILatLong>(this.productsUrl).pipe(
//       tap((data) => console.log('All : ' + JSON.stringify(data))),
//       catchError(this.handleError)
//     );
//   }

//   private handleError(err: HttpErrorResponse) {
//     let errorMesasge = '';
//     if (err.error instanceof ErrorEvent) {
//       errorMesasge = `An error occured : ${err.error.message}`;
//     } else
//       errorMesasge = `server returned code : ${err.status}, error message is : ${err.message}`;
//     console.log(errorMesasge);
//     return throwError(errorMesasge);
//   }
// }

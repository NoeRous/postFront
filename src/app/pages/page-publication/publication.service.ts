import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { Publication } from './publication';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  apiUrl = `${environment.apiURL}/publication`; 
  urlUpload = `${environment.apiURL}/util/file-upload`; // environment.apiURL + '/util/file-upload';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PublicationService');
  }

 
  getPublicationsActives(): Observable<Publication[]> {
    const url = `${this.apiUrl}/active`;
    return this.http.get<Publication[]>(url)
      .pipe(
        catchError(this.handleError('getPublicationsActives', []))
      );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { PhaseAction } from './phase-action';
import { Observable, catchError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhaseActionService {

  url = `${environment.apiURL}/phase-action`; 

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PhaseActionService');
  }


  getPhaseActions(id:number): Observable<PhaseAction[]> {
    const url = `${this.url}/announcement/${id}`;
    return this.http.get<PhaseAction[]>(url)
      .pipe(
        catchError(this.handleError('getPhaseActions', []))
      );
  }

  getPhaseActionsByPostulation(id:number): Observable<PhaseAction[]> {
    const url = `${this.url}/postulation/${id}`;
    return this.http.get<PhaseAction[]>(url)
      .pipe(
        catchError(this.handleError('getPhaseActionsByPostulation', []))
      );
  }


}

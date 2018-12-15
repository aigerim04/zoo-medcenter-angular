import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Specialty} from './specialty';
import {catchError} from "rxjs/internal/operators";
import {HandleError, HttpErrorHandler} from "../error.service";
import {HttpClient,HttpHeaders} from "@angular/common/http";

@Injectable()
export class SpecialtyService {

  private entity_url = environment.REST_API_URL + 'specialties';

  private handlerError: HandleError;
  headers_object = new HttpHeaders();
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
    this.headers_object.append('Content-Type', 'application/json');
    this.headers_object.append("Authorization", "Basic " + btoa("admin:admin"));

  }

  getSpecialties(): Observable<Specialty[]> {
    const options = {
      headers: this.headers_object
    };
    return this.http.get<Specialty[]>(this.entity_url, options)
      .pipe(
        catchError(this.handlerError('getSpecialties', []))
      );
  }

  getSpecialtyById(spec_id: string): Observable<Specialty> {
    const options = {
      headers: this.headers_object
    };
    return this.http.get<Specialty>((this.entity_url + '/' + spec_id), options)
      .pipe(
        catchError(this.handlerError('getSpecialtyById', {} as Specialty))
      );
  }

  addSpecialty(specialty: Specialty): Observable<Specialty> {
    const options = {
      headers: this.headers_object
    };
    return this.http.post<Specialty>(this.entity_url, specialty, options)
      .pipe(
        catchError(this.handlerError('addSpecialty', specialty))
      );
  }

  updateSpecialty(spec_id: string, specialty: Specialty): Observable<Specialty> {
    const options = {
      headers: this.headers_object
    };
    return this.http.put<Specialty>((this.entity_url + '/' + spec_id), specialty, options)
      .pipe(
        catchError(this.handlerError('updateSpecialty', specialty))
      );
  }

  deleteSpecialty(spec_id: string): Observable<number> {
    const options = {
      headers: this.headers_object
    };
    return this.http.delete<number>((this.entity_url + '/' + spec_id), options)
      .pipe(
        catchError(this.handlerError('deleteSpecialty', 0))
      );
  }

}

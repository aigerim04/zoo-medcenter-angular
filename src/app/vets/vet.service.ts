import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Vet} from './vet';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {HandleError, HttpErrorHandler} from "../error.service";
import {catchError} from "rxjs/internal/operators";


@Injectable()
export class VetService {

  entity_url = environment.REST_API_URL + 'vets';

  private handlerError: HandleError;
  headers_object = new HttpHeaders();
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
    this.headers_object.append('Content-Type', 'application/json');
    this.headers_object.append("Authorization", "Basic " + btoa("admin:admin"));
  }

  getVets(): Observable<Vet[]> {
    const options = {
      headers: this.headers_object
    };
    return this.http.get<Vet[]>(this.entity_url, options)
      .pipe(
        catchError(this.handlerError('getVets', []))
      );
  }

  getVetById(vet_id: string): Observable<Vet> {
    const options = {
      headers: this.headers_object
    };
    return this.http.get<Vet>((this.entity_url + '/' + vet_id), options)
      .pipe(
        catchError(this.handlerError('getVetById', {} as Vet))
      );
  }

  updateVet(vet_id: string, vet: Vet): Observable<Vet> {
    const options = {
      headers: this.headers_object
    };
    return this.http.put<Vet>(this.entity_url + '/' + vet_id, vet, options)
      .pipe(
        catchError(this.handlerError('updateVet', vet))
      );
  }

  addVet(vet: Vet): Observable<Vet> {
    const options = {
      headers: this.headers_object
    };
    return this.http.post<Vet>(this.entity_url, vet, options)
      .pipe(
        catchError(this.handlerError('addVet', vet))
      );
  }

  deleteVet(vet_id: string): Observable<number> {
    const options = {
      headers: this.headers_object
    };
    return this.http.delete<number>(this.entity_url + '/' + vet_id, options)
      .pipe(
        catchError(this.handlerError('deleteVet', 0))
      );
  }

}

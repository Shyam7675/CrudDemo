import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudOperationService {
  apiURL : string = 'http://localhost:3000/inventoryData';
  headers = new HttpHeaders().set('Content-type','application/json');

  constructor(private http:HttpClient) { }

  // create new data
  create(data : any): Observable<any>{
    let API_URL = `${this.apiURL}`;
    return this.http.post(API_URL,data).pipe(
      catchError(this.handleError)
    )
  }

  list(){
    return this.http.get(`${this.apiURL}`);
  }

  //update
  update(id: any, data:any): Observable<any>{
    let API_URL = `${this.apiURL}/${id}`;
    return this.http.put(API_URL,data,{headers : this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  //delete data
  delete(id:any): Observable<any>{
    var API_URL = `${this.apiURL}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  getById(id:any){
    return this.http.get(`${this.apiURL}/${id}`);
  }

  handleError(error : HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log('An error occurred:', error.error.message)
    }else{
      console.log(`Backend return code ${error.status},` + `body was: ${error.error}`);
    }
    return throwError("something went wrong please try again later.")

  }

}

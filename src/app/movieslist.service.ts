import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieslistService {

  constructor(private http:HttpClient,
              public sessionStorageService:SessionStorageService) { }

  getMovies(url:any):Observable<any>{
    // var headers = new HttpHeaders({
    //   Authorization: this.sessionStorageService.get('userToken')
    // })
    // return this.http.get(url,{headers})
    return this.http.get(url)
  }
}

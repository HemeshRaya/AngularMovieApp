import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  getToken(userDetails:any):Observable<any>{
    return this.http.post('https://demo.credy.in/api/v1/usermodule/login/',{
      "username": userDetails.uname,
      "password": userDetails.pass
    })
  }
}

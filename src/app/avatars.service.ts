import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarsService {

  constructor(private http:HttpClient) { }

  getAvatar(title:any):Observable<any>{
    title = title.replace(/ /g, "+");
    return this.http.get('https://ui-avatars.com/api/?format=svg&rounded=true&name='+title)
  }
}

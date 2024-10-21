import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url +"/api/";
  constructor(private http: HttpClient ) {

  }

  getUserInformation(): Observable<any> {
    return this.http.get<any>(this.url +'buddy-profiles/me/');

  }
}

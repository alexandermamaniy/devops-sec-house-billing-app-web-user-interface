import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  url = environment.url +"/api/";
  constructor( private http: HttpClient ) {

  }

  getGroups(): Observable<any>  {
    return this.http.get<any>(this.url+'buddy-groups/me');
  }

  createGroup(data): Observable<any>  {
    return this.http.post(this.url+'buddy-groups/',data);
  }


  // getGroupByID(group_id): Observable<any>  {
  //   return this.http.get<any>(this.url+'buddy-groups/'+group_id);
  // }


}

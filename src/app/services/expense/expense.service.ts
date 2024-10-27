import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  url = environment.url +"/api/";
  constructor( private http: HttpClient ) {

  }

  getExpenseByGroupId(group_id): Observable<any>  {
    return this.http.get<any>(this.url+'buddy-expenses/group/'+group_id);
  }

  getExpenseByUserAuthenticated(): Observable<any>  {
    return this.http.get<any>(this.url+'buddy-expenses/me');
  }

  createExpense(data): Observable<any> {
    return this.http.post(this.url+'buddy-expenses/',data);
  }
}

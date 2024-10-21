import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

interface User {
  email: string;
  password: string;
}
interface TokenVerify{
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url +"/api/";
  constructor( private http: HttpClient ) {

  }

  login(email: string, password:string): Observable<User>  {

    return this.http.post<User>(this.url+'token/', {email, password});
  }


  verify_token(token: string): Observable<any>  {
    return this.http.post<TokenVerify>(this.url+'token/verify/', {token});
  }

  //
  // login(email:string, password:string ) {
  //   return this.http.post<User>('/api/login', {email, password})
  //     .do(res => this.setSession)
  //     .shareReplay();
  // }
  //
  // private setSession(authResult) {
  //   const expiresAt = moment().add(authResult.expiresIn,'second');
  //
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  // }
  //
  // logout() {
  //   localStorage.removeItem("id_token");
  //   localStorage.removeItem("expires_at");
  // }
  //
  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }
  //
  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }
  //
  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }

}

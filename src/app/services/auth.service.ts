import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  authToken: string;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser() {

  }

  authenticateUser(user) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl+'/user/authenticate', user, {headers:headers});
  }

  storeUserData(token, user) {
    this.authToken = token;
    this.user = user;
    window.localStorage.setItem('id_token', token);
    window.localStorage.setItem(user, JSON.stringify(user));
  }

  loadToken() {
    this.authToken = window.localStorage.getItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired('id_token', this.authToken);
  }

}

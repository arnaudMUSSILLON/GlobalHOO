import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  authToken: string;
  user: any;

  constructor(private http: HttpClient, private storage: NativeStorage) { }

  registerUser(user) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl+'/user/create', user, {headers:headers});
  }

  authenticateUser(user) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl+'/user/authenticate', user, {headers:headers});
  }

  storeUserData(token, user) {
    this.authToken = token;
    this.user = user;
    this.storage.setItem('id_token', {token: this.authToken});
    this.storage.setItem('user', this.user);
  }

  loadToken() {
    this.storage.getItem('id_token')
      .then(data => this.authToken = data);
  }

  loggedIn() {
    return tokenNotExpired('id_token', this.authToken);
  }

}

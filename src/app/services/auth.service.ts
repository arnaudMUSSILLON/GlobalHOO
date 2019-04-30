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

  registerUser() {

  }

  authenticateUser(user) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl+'/user/authenticate', user, {headers:headers});
  }

  storeUserData(token, user) {
    this.authToken = token;
    this.user = user;
    console.log(user.first_name);
    this.storage.setItem('id_token', {token: this.authToken})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
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

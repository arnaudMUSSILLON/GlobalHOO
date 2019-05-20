import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  authToken: string;
  user: any;

  constructor(private http: HttpClient, private storage: NativeStorage) { }

  /**
   * Call to the API to try to register the user
   * @param user 
   */
  registerUser(user) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl+'/user/create', user, {headers:headers});
  }

  /**
   * Ask the API if the credentials are correct
   * @param user 
   */
  authenticateUser(user) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl+'/user/authenticate', user, {headers:headers});
  }

  /**
   * Try to reach the API to request a change of informations
   * @param user
   */
  updateUser(user) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return Observable.fromPromise(this.getToken())
      .flatMap(token => {
        headers.append('Authorization', token);
        return this.http.post(environment.apiUrl+'/user/update', user, {headers:headers});
    });
  }

  /**
   * Store the token and the user in the storage of the device
   * @param token 
   * @param user 
   */
  storeUserData(token, user) {
    this.authToken = token;
    this.user = user;
    this.storage.setItem('id_token', {token: this.authToken});
    this.storage.setItem('user', this.user);
  }

  /**
   * Check if the token expired
   */
  loggedIn(): Promise<boolean> {
    return this.getToken()
      .then(token => {
        if(token !== '') {
          return tokenNotExpired('id_token', token);
        } else
          return false;
      });
  }

  logout() {
    return this.storage.clear();
  }

  /**
   * Promise returning the token from the storage
   */
  getToken(): Promise<string> {
    return this.storage.keys()
      .then(keys => {
        for(let key of keys) {
          if(key === 'id_token') {
            return this.storage.getItem('id_token')
              .then(data => {              
                return data.token;
              });
          }
        }
        return '';
      }).catch(err => { console.log(err) });
  }

  /**
   * Promise returning the user from the storage
   */
  getUser(): Promise<any> {
    return this.storage.getItem('user')
      .then(data => {
        return {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        };
      });
  }
}

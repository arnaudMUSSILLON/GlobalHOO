import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Call to the API to upload the image
   * @param photo 
   */
  uploadImage(photo) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return Observable.fromPromise(this.authService.getToken())
      .flatMap(token => {
        headers.append('Authorization', token);
        return this.http.post(environment.apiUrl+'/image/upload', photo, {headers:headers});
    });
  }
}

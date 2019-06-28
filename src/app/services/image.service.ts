import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageList: Array<Object>;
  user: any;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.loadImages();
  }

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

  /**
   * Try to load the image uploaded by the current user
   */
  loadImages() {
    this.authService.getUser().then(user => {
      this.user = user;
      this.getAllImages({email: user.email}).subscribe((data:any) => {
        if(data.success===true) this.imageList = data.images;
      });
    });
  }

  /**
   * API call to retrieve all uploaded images data of a user
   * @param email 
   */
  getAllImages(email) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return Observable.fromPromise(this.authService.getToken())
      .flatMap(token => {
        headers.append('Authorization', token);
        return this.http.post(environment.apiUrl+'/image/get/all', email, {headers:headers});
    });
  }

  /**
   * API call to download the image from the server
   * @param email 
   */
  getImage(id, email) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return Observable.fromPromise(this.authService.getToken())
      .flatMap(token => {
        headers.append('Authorization', token);
        return this.http.post(environment.apiUrl+'/image/get/'+id, email, {headers:headers});
    });
  }
}

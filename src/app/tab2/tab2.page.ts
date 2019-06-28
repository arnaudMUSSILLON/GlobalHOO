import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  photoUrl: string;
  currentPlatorm: string;
  metadata: any;

  constructor(private camera: Camera, private router: Router, private platform: Platform) { 
    platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.currentPlatorm = 'ios';
      }
      if (this.platform.is('android')) {
        this.currentPlatorm = 'android';
      }
    });
  }

  openCamera() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 1000,
      targetWidth: 150,
      targetHeight: 150,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.extractData(imageData);
    }, (err) => {
      console.log(err);
    });
  }

  openGallery() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 1000,
      targetWidth: 150,
      targetHeight: 150,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.extractData(imageData);
    }, (err) => {
      console.log(err);
    });
  }

  extractData(data) {
    let parsedData = JSON.parse(data);
    let parsedMetadata = JSON.parse(parsedData.json_metadata);
    if (parsedData.json_metadata !== '{}') {
      if (this.currentPlatorm === 'ios') {  // IOS device
        this.metadata = { 
          lat: parsedMetadata.GPS.Latitude,
          long: parsedMetadata.GPS.Longitude,
          date: parsedMetadata.Exif.DateTimeDigitized
        };
      } else {  // ANDROID device
        //TODO
        // alert('Lat: '+parsedData.gpsLatitude+' Lon: '+parsedData.gpsLongitude);
      }
    }
    this.photoUrl = parsedData.filename;
    let navigationExtras: NavigationExtras = {
      state: {photo: this.photoUrl, metadata: this.metadata}
    };
    this.router.navigateByUrl('/app/tabs/tab2/options', navigationExtras);
  }
}

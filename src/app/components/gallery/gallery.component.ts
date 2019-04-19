import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  photos: Array<any>;
  selectedPhoto: any;

  constructor() { }

  ngOnInit() {
    this.photos = [];
    for (let i = 0; i < 25; i+=4) { 
      this.photos.push({path: './assets/ocean/ocean1.jpg', selected: false});
      this.photos.push({path: './assets/ocean/ocean2.jpg', selected: false});
      this.photos.push({path: './assets/ocean/ocean3.jpg', selected: false});
      this.photos.push({path: './assets/ocean/ocean4.jpg', selected: false});
    }
    this.selectedPhoto = this.photos[0];
    this.selectedPhoto.selected = true;
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      for (let i = 0; i < 25; i++) { 
        this.photos.push({path: './assets/ocean/ocean1.jpg', selected: false});
      }
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.photos.length == 100) {
        event.target.disabled = true;
      }
    }, 500);
  }

  imageOnClick(photo: any) {
    this.selectedPhoto.selected = false;
    this.selectedPhoto = photo;
    this.selectedPhoto.selected = true;
  }
}

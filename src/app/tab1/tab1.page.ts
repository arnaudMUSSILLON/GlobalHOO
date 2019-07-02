import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  get images() { return this.imageService.imageList; }  // Try to get user's images
  get user() { return this.imageService.user; }
  
  constructor(private router:Router, private imageService: ImageService, private toast: ToastController) { }

  /**
   * Call the API to get the image and the informations related to it
   * @param image item
   */
  itemOnClick(image) {
    this.imageService.getImage(image.id, {email: this.user.email}).subscribe((data:any) => {
      if(data.success) {
        this.router.navigateByUrl('/image-detail');
        let navigationExtras: NavigationExtras = {
          state: {image: data.image, imagedata: data.imagedata}
        };
        this.router.navigateByUrl('/app/tabs/tab1/detail', navigationExtras);
      } else {
        this.presentDangerToast(data.msg);
      }
    });
  }

  /**
   * Redirection to the upload page
   */
  navigateToUpload() {
    this.router.navigateByUrl('/app/tabs/tab2');
  }

  async presentDangerToast(msg: string) {
    let t = await this.toast.create({ message : msg, duration: 3000, color: 'danger' });
    t.present();
  }
}

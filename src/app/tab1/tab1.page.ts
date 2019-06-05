import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  errorMessage: string;
  images: Array<Object>;
  user: any;
  
  constructor(private router:Router,
    private authService: AuthService,
    private imageService: ImageService,
    private toast: ToastController
  ) {
    // Try to get user's images
    this.authService.getUser().then(user => {
      this.user = user;
      this.imageService.getAllImages({email: user.email}).subscribe((data:any) => {
        if(data.success===true)
          this.images = data.images;
        else
          this.errorMessage = data.msg;
      });
    });
  }

  itemOnClick(image) {
    this.imageService.getImage(image.id, {email: this.user.email}).subscribe((data:any) => {
      console.log(data);
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

  navigateToUpload() {
    this.router.navigateByUrl('/app/tabs/tab2');
  }

  async presentDangerToast(msg: string) {
    let t = await this.toast.create({ message : msg, duration: 3000, color: 'danger' });
    t.present();
  }
}

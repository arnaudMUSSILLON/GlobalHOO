import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-image-options',
  templateUrl: './image-options.page.html',
  styleUrls: ['./image-options.page.scss'],
})
export class ImageOptionsPage implements OnInit {
  private photo: string;
  private metadata: any;

  onlyLettersRegex = /^[A-Z\s]+$/i;
  uploadform = new FormGroup({
    type: new FormControl('', Validators.compose([
      Validators.maxLength(50),
      Validators.pattern(this.onlyLettersRegex)
    ])),
    infos: new FormControl('', Validators.compose([
      Validators.maxLength(250)
    ])),
    stranding: new FormControl(false)
  });

  validation_messages = {
    'type': [
      { type: 'maxlength', message: 'Cannot exceed 50 characters' },
      { type: 'pattern', message: 'Must contain only letters'}
    ],
    'infos': [
      { type: 'maxlength', message: 'Cannot exceed 250 characters' },
    ],
  };

  constructor(private route: ActivatedRoute, private router: Router, private imageService: ImageService, private authService: AuthService, private toast: ToastController) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.photo = this.router.getCurrentNavigation().extras.state.photo;
        this.metadata = this.router.getCurrentNavigation().extras.state.metadata;
      }
    });
  }

  ngOnInit() {
  }

  upload() {
    this.authService.getUser().then(storedUser => {
      let photo = {
        email: storedUser.email,
        url: this.photo,
        metadata: this.metadata,
        type: this.uploadform.get('type').value,
        infos: this.uploadform.get('infos').value,
        stranding: this.uploadform.get('stranding').value
      };
      this.imageService.uploadImage(photo).subscribe((data:any) => {
        if(data.success) {
          this.presentSuccessToast(data.msg);
        } else {
          this.presentDangerToast(data.msg);
        }
      });
    });
  }


  async presentDangerToast(msg: string) {
    let t = await this.toast.create({ message : msg, duration: 3000, color: 'danger' });
    t.present();
  }

  async presentSuccessToast(msg: string) {
    let t = await this.toast.create({ message : msg, duration: 3000, color: 'success' });
    t.present();
  }
}

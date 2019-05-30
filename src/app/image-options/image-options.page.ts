import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-image-options',
  templateUrl: './image-options.page.html',
  styleUrls: ['./image-options.page.scss'],
})
export class ImageOptionsPage implements OnInit {
  private photo: any;
  private filePath: string;
  private metadata: any;

  onlyDigitRegex = /^[0-9]*\.?[0-9]+$/;
  onlyLettersRegex = /^[A-Z\s]+$/i;
  uploadform = new FormGroup({
    type: new FormControl('', Validators.compose([
      Validators.maxLength(50),
      Validators.pattern(this.onlyLettersRegex)
    ])),
    size: new FormControl('', Validators.compose([
      Validators.maxLength(10),
      Validators.pattern(this.onlyDigitRegex)
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
    'size': [
      { type:'maxlength', message: 'Cannot be this long' },
      { type: 'pattern', message: 'Expect numbers such as 1, 2.3, 0.54' }
    ],
    'infos': [
      { type: 'maxlength', message: 'Cannot exceed 250 characters' },
    ],
  };

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private file: File,
    private imageService: ImageService, 
    private authService: AuthService,
    private toast: ToastController,
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.filePath = this.router.getCurrentNavigation().extras.state.photo;
        this.metadata = this.router.getCurrentNavigation().extras.state.metadata;
      }
    });
  }
  
  ngOnInit() {
    if(this.filePath === undefined) { this.router.navigateByUrl('/app'); }
  }

  /**
   * Convert the image into a base64 image and try to send it to the server with metadata
   */
  upload() {
    // split file path to directory and file name
    let fileName = this.filePath.split('/').pop();
    let path = this.filePath.substring(0, this.filePath.lastIndexOf("/") + 1);

    this.file.readAsDataURL(path, fileName)
      .then(base64File => {
        this.authService.getUser().then(storedUser => {
          // this.photo = (<any>window).Ionic.WebView.convertFileSrc(this.filePath);
          let photo = {
            email: storedUser.email,
            photo: base64File,
            metadata: this.metadata,
            type: this.uploadform.get('type').value,
            size: this.uploadform.get('size').value,
            infos: this.uploadform.get('infos').value,
            stranding: this.uploadform.get('stranding').value
          };
          this.imageService.uploadImage(photo).subscribe((data:any) => {
            if(data.success) {
              this.presentSuccessToast(data.msg);
              this.router.navigateByUrl('/app');
            } else {
              this.presentDangerToast(data.msg);
            }
          });
        });
      })
      .catch(() => {
        alert('Error converting the photo');
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

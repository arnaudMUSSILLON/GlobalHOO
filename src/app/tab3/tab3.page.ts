import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: any;

  onlyLettersRegex = /^[A-Z]+$/i;
  updateform;

  validation_messages = {
    'first_name': [
      { type: 'required', message: 'First name is required.' },
      { type: 'maxlength', message: 'Cannot exceed 15 characters' },
      { type: 'pattern', message: 'Must contain only letters'}
    ],
    'last_name': [
      { type: 'required', message: 'Last name is required.' },
      { type: 'maxlength', message: 'Cannot exceed 20 characters' },
      { type: 'pattern', message: 'Must contain only letters'}
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'maxlength', message: 'Cannot exceed 50 characters' },
      { type: 'email', message: 'Your email must be valid.' },     
    ]
  }

  constructor(private authService: AuthService, private toast: ToastController) {
    this.authService.getUser().then((data) => {
      this.user = data;
      this.updateform = new FormGroup({
        first_name: new FormControl(this.user.first_name, Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(this.onlyLettersRegex)
        ])),
        last_name: new FormControl(this.user.last_name, Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(this.onlyLettersRegex)
        ])),
        email: new FormControl({value: this.user.email, disabled: true}, Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.email
        ]))
      });
    });
  }

  update() {
    this.authService.getUser().then(storedUser => {
      let user = {
        first_name: this.updateform.get('first_name').value,
        last_name: this.updateform.get('last_name').value,
        email: this.updateform.get('email').value,
        current_email: storedUser.email
      };
      this.authService.updateUser(user).subscribe((data:any) => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.presentSuccessToast(data.msg);
        } else {
          this.presentDangerToast(data.msg);
        }
      });
    })
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

import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';
import { AboutPage } from '../components/about/about.page';
import { LegalPage } from '../components/legal/legal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
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

  constructor(private router: Router,
    private authService: AuthService,
    private toast: ToastController,
    private modalController: ModalController
  ) {
    this.authService.getUser().then(user => {   // Load user from storage and prefill the inputs
      this.updateform = new FormGroup({
        first_name: new FormControl(user.first_name, Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(this.onlyLettersRegex)
        ])),
        last_name: new FormControl(user.last_name, Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(this.onlyLettersRegex)
        ])),
        email: new FormControl({value: user.email, disabled: true}, Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.email
        ]))
      });
    });
  }

  /**
   * Try to update the user's profile
   * Show result to the user if success or failure
   */
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

  /**
   * Logout from the application and redirect to login screen
   */
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  async presentDangerToast(msg: string) {
    let t = await this.toast.create({ message : msg, duration: 3000, color: 'danger' });
    t.present();
  }

  async presentSuccessToast(msg: string) {
    let t = await this.toast.create({ message : msg, duration: 3000, color: 'success' });
    t.present();
  }

  /**
   * Display the about modal
   */
  async presentAboutModal() {
    const modal = await this.modalController.create({
      component: AboutPage,
      componentProps: { }
    });
    return await modal.present();
  }

  /**
   * Display legal modal
   */
  async presentLegalModal() {
    const modal = await this.modalController.create({
      component: LegalPage,
      componentProps: { }
    });
    return await modal.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  onlyLettersRegex = /^[A-Z]+$/i;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  signupform = new FormGroup({
    first_name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(15),
      Validators.pattern(this.onlyLettersRegex)
    ])),
    last_name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(this.onlyLettersRegex)
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(50),
      Validators.email
    ])),
    passwords: new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.passwordRegex)
      ])),
      password_confirm: new FormControl('', Validators.compose([
        Validators.required
      ]))
    }, this.passwordMatchValidator), 
  });

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
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Must be at least 6 characters long' },
      { type: 'pattern', message: 'Must contain at least 1 lowercase and uppercase alphabetical character and 1 numeric character' },
    ],
    'password_confirm': [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'mismatch', message: 'Passwords must be identical' },
    ]
  };

  constructor(private router: Router, 
    private authService: AuthService,
    private toast: ToastController) { }

  ngOnInit() {
  }

  register() {
    let user = {
      first_name: this.signupform.get('first_name').value,
      last_name: this.signupform.get('last_name').value,
      email: this.signupform.get('email').value,
      password: this.signupform.get(['passwords', 'password']).value,
      confirm_password: this.signupform.get(['passwords', 'password_confirm']).value
    };
    this.authService.registerUser(user).subscribe((data:any) => {
      if(data.success) {
        let registeredUser = { email: user.email, password: user.password };
        this.authService.authenticateUser(registeredUser).subscribe((data:any) => {
          if(data.success) {
            this.authService.storeUserData(data.token, data.user);
            this.router.navigateByUrl('/app');
          } else {
            this.presentToast(data.msg);
          }
        });
      } else {
        this.presentToast(data.msg);
      }
    });
  }

  /**
   * Compare 2 passwords and return the result
   * @param group 
   */
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('password_confirm').value
      ? null : {'mismatch': true};
  }

  async presentToast(msg: string) {
    let t = await this.toast.create({
      message : msg,
      duration: 3000,
      color: 'danger',
    });
    t.present();
  }
}

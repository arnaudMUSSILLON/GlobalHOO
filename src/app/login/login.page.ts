import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: String;
  password: String;

  emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  signinform = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(this.emailPattern)
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      //Validators.minLength(6),
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')   //Both lowercase and uppercase password
    ]))
  });

  validation_messages = {
    'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Your email must be valid.' },
      ],
      'password': [
        { type: 'required', message: 'Password is required.' }
      ],
    }

  constructor(private router: Router, 
    private authService: AuthService,
    private toast: ToastController) { }

  ngOnInit() {
  }

  login() {
    this.email = this.signinform.get('email').value;  //angular 7 ngmodel
    this.password = this.signinform.get('password').value;
    const user = { email: this.email, password: this.password };
    this.authService.authenticateUser(user).subscribe((data:any) => {
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigateByUrl('/app');
      } else {
        this.presentToast(data.msg);
        console.log(data.msg);
      }
    });
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

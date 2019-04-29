import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: String;
  password: String;

  validations_form = new FormBuilder().group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')   //Both lowercase and uppercase password
    ]))
  });

  validation_messages = {
    'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'minlength', message: 'Email must be at least 6 characters long.' },
        { type: 'pattern', message: 'Your email must be valid.' },
      ],
      'name': [
        { type: 'required', message: 'Name is required.' }
      ],
    }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    const user = { email: this.email, password: this.password };
    this.authService.authenticateUser(user).subscribe((data:any) => {
      if(data.success) {
        console.log('Logged in');
        this.authService.storeUserData(data.token, data.user);
        this.router.navigateByUrl('app');
      } else {
        console.log('Failed to log in');
        console.log(data.msg);
      }
    });
  }
}

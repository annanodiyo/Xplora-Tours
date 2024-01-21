import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userAuth: AuthService,
    private userService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  errorMessage: string = '';
  email: string = '';
  name: string = '';

  successMessage: string = '';
  loggingIn: boolean = false;
  loggedInState: boolean = false;

  loggedIn = false;

  async loginUser() {
    //retrieve user details from the form
    let user_details = this.loginForm.value;
    console.log(user_details);

    //method from userAuth to authenticate the user
    let response = await this.userAuth.login(user_details);

    if (response.error) {
      this.loggingIn = false;
      this.errorMessage = response.error;

      setTimeout(() => {
        this.errorMessage = '';
        this.loggingIn = false;
      }, 3000);
    } else if (response.message) {
      console.log(response.message);

      this.loggedInState = true;
      this.successMessage = response.message;
      this.loggedIn = true;

      let { role, name, email, phone_number, user_id } =
        await this.userService.checkCredentials();

      let xz = await this.userService.checkCredentials();
      console.log('respons is sdsadasd ', xz);

      // console.log('user credentials from check credentials', cred);

      localStorage.setItem('loggedIn', `${this.loggedIn}`);
      localStorage.setItem('name', `${name}`);
      localStorage.setItem('email', `${email}`);
      localStorage.setItem('phone_number', `${phone_number}`);
      localStorage.setItem('user_id', `${user_id}`);
      console.log(role);

      setTimeout(async () => {
        this.successMessage = '';
        this.loggedInState = false;

        if (role === 'Admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
      }, 3000);
    }
  }
}

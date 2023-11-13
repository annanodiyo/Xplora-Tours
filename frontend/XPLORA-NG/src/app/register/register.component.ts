import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { userDetails } from '../interfaces/user-interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  buttonClicked: boolean = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required]],
      full_name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  // registerUser() {
  //   let registrationForm = this.registrationForm.value;
  //   let registeredUser: userDetails = this.registrationForm.value;
  //   this.authService.registerUser(registeredUser);
  //   console.log(registrationForm);
  // }
  registerUser() {
    this.buttonClicked = true;
    if (this.registerForm.valid) {
      let registeredUser: userDetails = this.registerForm.value;
      this.authService.registerUser(registeredUser);
      console.log('User registered:', registeredUser);
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}

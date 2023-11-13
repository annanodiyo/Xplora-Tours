import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { userDetails } from '../interfaces/user-interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  buttonClicked: boolean = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.registrationForm = formBuilder.group({
      email: ['', [Validators.required]],
      full_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  registerUser() {
    this.buttonClicked = true;
    console.log('happy monday');

    if (this.registrationForm.valid) {
      let registeredUser: userDetails = this.registrationForm.value;
      this.authService.registerUser(registeredUser);
      console.log('user registered:', registeredUser);
    } else {
      console.log('Form is invalid. Please fill in all reqired fields');
    }
  }
}

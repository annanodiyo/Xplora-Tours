import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { userDetails } from '../interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  buttonClicked: boolean = false;
  showSuccess: boolean = false;
  showPassword:boolean = false;
  password: string='';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
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
    // console.log('happy monday');

    if (this.registrationForm.valid) {
      let registeredUser: userDetails = this.registrationForm.value;

      this.authService.registerUser(registeredUser);
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
        this.router.navigate(['/login']);
      }, 2000);
      console.log('user registered:', registeredUser);
    } else {
      console.log('Form is invalid. Please fill in all required fields');
      // alert('Form is invalid. Please fill in all reqired fields');
    }
  }

  togglePassword(){
    this.showPassword =!this.showPassword
  }
}

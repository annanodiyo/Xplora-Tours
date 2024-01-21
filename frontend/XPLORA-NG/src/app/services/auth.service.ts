import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDetails } from '../interfaces/user-interface';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(user: userDetails) {
    this.http
      .post('http://localhost:3800/user/register', user)
      .subscribe((res) => {
        console.log(res);

        return res;
      });
  }

  async login(userLogin: Login) {
    let response = await fetch('http://localhost:3800/user/login', {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userLogin),
    });
    console.log(response);

    const data = await response.json();
    let token = data.token;
    localStorage.setItem('token', token);

    console.log(token);

    return data;
  }
}

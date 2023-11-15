import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDetails } from '../interfaces/user-interface';

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
}

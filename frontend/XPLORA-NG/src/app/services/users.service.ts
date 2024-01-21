import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
  async getUsers() {
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:3800/user/allUsers', {
      headers: {
        'Content-type': 'application/json',
        token: token,
      },
    });
    let data = await res.json();
    return data;
  }

  async checkCredentials() {
    try {
      let token = localStorage.getItem('token') as string;
      let res = await fetch('http://localhost:3800/user/checkCredentials', {
        headers: {
          'Content-type': 'application/json',
          token: token,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user information');
      }
      console.log('this is my response from the db', res);
      let data = await res.json();
      console.log(data);

      let user_id = data.info && data.info.user_id ? data.info.user_id : null;

      if (data.information) {
        let role = data.information.role;
        let name = data.information.full_name;
        let email = data.information.email;
        let phone_number = data.information.phone_number;

        return { role, name, email, phone_number, user_id };
      } else {
        throw new Error('User information is missing');
      }
    } catch (error: any) {
      console.error('Error fetching user information:', error.message);

      throw error;
    }
  }
}

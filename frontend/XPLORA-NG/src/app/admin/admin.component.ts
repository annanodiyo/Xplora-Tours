import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { getAllUserDetails } from '../interfaces/user-interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  name: string = '';
  allusers: getAllUserDetails[] = [];
  constructor(private userService: UsersService) {
    this.name = localStorage.getItem('name') as string;
  }
  ngOnInit() {
    this.getAllUserDetails();
  }
  getAllUserDetails() {
    this.userService.getUsers().then((data) => {
      console.log(data);
      this.allusers = data.users;
      console.log(this.allusers);
    });
  }
}

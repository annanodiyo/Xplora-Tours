import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-asidebar',
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.css']
})
export class AsidebarComponent {
  // user: getUserDetails[] = []
  name:string = ""
  constructor(private userService: UsersService){
    this.name = localStorage.getItem('name') as string
  }



}

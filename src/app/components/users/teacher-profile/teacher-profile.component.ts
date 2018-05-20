import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../services/users.service";

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  currentUser: any;
  constructor(private usersSvc: UsersService) {
    this.currentUser = {};
  }

  ngOnInit() {
    this.usersSvc.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

}

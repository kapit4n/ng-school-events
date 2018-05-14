import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent implements OnInit {
  
  teacher: any;

  constructor(private teachersSvc: TeachersService) {
    this.teacher = {userType: "teacher"};
  }

  ngOnInit() {
  }

}
